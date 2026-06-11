import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';
import { HighlightFavorite } from '../directives/highlight-favorite';

@Component({
  selector: 'app-track-card',
  imports: [DurationFormatPipe, HighlightFavorite],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCard {
  // Le morceau à afficher (entrée obligatoire).
  track = input.required<Track>();
  // Indique si cette carte est la carte active.
  active = input(false);
  // Autorise l'affichage du bouton supprimer (uniquement si connecté).
  canDelete = input(false);
  // Affiche l'action favori (piloté par le feature flag Favoris).
  favoritesEnabled = input(true);
  // Émet le morceau quand l'utilisateur clique sur la carte.
  select = output<Track>();
  // Émet le morceau quand l'utilisateur veut le supprimer.
  remove = output<Track>();
  // Émet le morceau quand l'utilisateur bascule le statut favori.
  toggleFav = output<Track>();
}
