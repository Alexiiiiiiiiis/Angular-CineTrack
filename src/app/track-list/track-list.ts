import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { TrackCard } from '../track-card/track-card';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-list',
  imports: [TrackCard],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackList {
  // La liste reçoit les morceaux du parent : elle ne détient aucune donnée en dur.
  tracks = input.required<Track[]>();
  // Remonte au parent l'id du morceau à supprimer.
  remove = output<number>();
  // Mémorise l'id de la carte actuellement active.
  protected selectedId = signal<number | null>(null);
  // Terme de recherche saisi par l'utilisateur.
  protected searchTerm = signal('');

  // Valeur DÉRIVÉE : recalculée automatiquement dès que searchTerm ou tracks change.
  protected filteredTracks = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.tracks();
    return this.tracks().filter(
      (t) =>
        t.title.toLowerCase().includes(term) ||
        t.artist.toLowerCase().includes(term),
    );
  });
}
