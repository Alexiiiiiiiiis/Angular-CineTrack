import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
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
  // Mémorise l'id de la carte actuellement active.
  protected selectedId = signal<number | null>(null);
}
