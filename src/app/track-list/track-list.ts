import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TrackCard } from '../track-card/track-card';
import { TrackSearch } from '../track-search/track-search';
import { TrackService } from '../services/track';
import { AuthService } from '../services/auth';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-list',
  imports: [TrackCard, TrackSearch],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackList {
  private trackService = inject(TrackService);
  private router = inject(Router);
  // État d'auth : pilote l'affichage du bouton supprimer.
  protected auth = inject(AuthService);

  // Déclencheur de rechargement : on l'incrémente après une suppression.
  private reload = signal(0);

  // F7/F11 : la liste vient de l'API ; rechargée quand `reload` change (source de vérité = API).
  private allTracks = toSignal(
    toObservable(this.reload).pipe(switchMap(() => this.trackService.getTracks())),
    { initialValue: [] as Track[] },
  );

  // Recherche client (J2) : valeur dérivée par computed().
  protected searchTerm = signal('');
  protected filteredTracks = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.allTracks();
    return this.allTracks().filter(
      (t) =>
        t.title.toLowerCase().includes(term) ||
        t.artist.toLowerCase().includes(term),
    );
  });

  // Clic sur une carte -> navigation vers la fiche détail (route tracks/:id).
  protected openDetail(id: number) {
    this.router.navigate(['/tracks', id]);
  }

  // Suppression via l'API (DELETE protégé par JWT) puis rechargement.
  protected removeTrack(id: number) {
    this.trackService.remove(id).subscribe(() => this.reload.update((n) => n + 1));
  }
}
