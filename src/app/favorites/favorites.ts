import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TrackCard } from '../track-card/track-card';
import { FavoriteService } from '../services/favorite';
import { AuthService } from '../services/auth';
import { ToastService } from '../services/toast';
import { Track } from '../models/track';

@Component({
  selector: 'app-favorites',
  imports: [TrackCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Favorites {
  private favoriteService = inject(FavoriteService);
  private router = inject(Router);
  protected auth = inject(AuthService);
  private toast = inject(ToastService);

  // État local de la page (signal). Chargé une fois depuis GET /favorites.
  protected favorites = signal<Track[]>([]);
  protected loading = signal(true);

  constructor() {
    this.favoriteService.getFavorites().subscribe({
      next: (tracks) => {
        this.favorites.set(tracks);
        this.loading.set(false);
      },
      // L'intercepteur affiche déjà un toast : on ne casse pas l'écran.
      error: () => this.loading.set(false),
    });
  }

  // Clic carte -> fiche détail.
  protected openDetail(id: number) {
    this.router.navigate(['/tracks', id]);
  }

  // Retrait depuis la page favoris : DELETE puis disparition de la liste.
  // On ne retire localement qu'en cas de succès (sinon l'état mentirait).
  protected removeFavorite(track: Track) {
    this.favoriteService.remove(track.id).subscribe(() => {
      this.favorites.update((list) => list.filter((t) => t.id !== track.id));
      this.toast.success('Retiré des favoris');
    });
  }
}
