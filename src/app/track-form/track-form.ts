import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { form, FormField, max, min, required } from '@angular/forms/signals';

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
  // Remonte le morceau valide au parent.
  add = output<TrackFormValue>();

  protected model = signal<TrackFormValue>({ title: '', artist: '', rating: 5 });

  // form(model, schema) : on attache les validateurs aux champs.
  protected trackForm = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0, { message: 'Minimum 0' });
    max(path.rating, 10, { message: 'Maximum 10' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    // Soumission VALIDE uniquement.
    if (this.trackForm().valid()) {
      this.add.emit(this.model());
      // Réinitialise le formulaire après ajout.
      this.model.set({ title: '', artist: '', rating: 5 });
    }
  }
}
