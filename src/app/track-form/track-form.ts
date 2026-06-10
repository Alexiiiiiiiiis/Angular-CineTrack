import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, max, min, required } from '@angular/forms/signals';
import { TrackService } from '../services/track';
import { Track } from '../models/track';

// Modèle typé du formulaire (les champs saisis par l'utilisateur).
export interface TrackFormValue {
  title: string;
  artist: string;
  rating: number;
}

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackForm {
  private trackService = inject(TrackService);
  private router = inject(Router);

  // Paramètre de route optionnel : présent en mode édition (tracks/:id/edit).
  id = input<number | undefined>(undefined, {
    transform: (v: unknown) => (v == null || v === '' ? undefined : Number(v)),
  });

  protected model = signal<TrackFormValue>({ title: '', artist: '', rating: 5 });

  // form(model, schema) : on attache les validateurs aux champs.
  protected trackForm = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0, { message: 'Minimum 0' });
    max(path.rating, 10, { message: 'Maximum 10' });
  });

  constructor() {
    // En mode édition : charger le morceau et pré-remplir le formulaire.
    effect(() => {
      const id = this.id();
      if (id != null) {
        this.trackService.getTrack(id).subscribe((t) =>
          this.model.set({ title: t.title, artist: t.artist, rating: t.rating }),
        );
      }
    });
  }

  protected isEdit() {
    return this.id() != null;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.trackForm().valid()) return;

    const value = this.model();
    const id = this.id();

    if (id != null) {
      // PATCH /tracks/:id (modification partielle)
      const changes: Partial<Track> = value;
      this.trackService.update(id, changes).subscribe(() => this.router.navigate(['/tracks']));
    } else {
      // POST /tracks (création) — title & artist requis côté API
      const payload: Omit<Track, 'id'> = {
        title: value.title,
        artist: value.artist,
        rating: value.rating,
        album: '—',
        genre: 'Inconnu',
        durationSeconds: 0,
        year: new Date().getFullYear(),
        favorite: false,
        coverUrl: `https://picsum.photos/seed/${Date.now()}/300`,
      };
      this.trackService.create(payload).subscribe(() => this.router.navigate(['/tracks']));
    }
  }
}
