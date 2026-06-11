import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TrackCard } from '../track-card/track-card';
import { TrackSearch } from '../track-search/track-search';
import { TrackService, TrackQuery } from '../services/track';
import { AuthService } from '../services/auth';
import { ToastService } from '../services/toast';
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
  private toast = inject(ToastService);

  // Déclencheur de rechargement : on l'incrémente après une mutation.
  private reload = signal(0);

  // Critères de tri / filtre (envoyés à l'API).
  protected sortBy = signal<NonNullable<TrackQuery['sort']>>('title');
  protected sortOrder = signal<'asc' | 'desc'>('asc');
  protected favoritesOnly = signal(false);

  // Regroupe tous les critères : toute modif déclenche un nouveau fetch.
  private criteria = computed<TrackQuery & { r: number }>(() => ({
    sort: this.sortBy(),
    order: this.sortOrder(),
    favorite: this.favoritesOnly(),
    r: this.reload(),
  }));

  // F7/F9/F11 : la liste vient de l'API (tri/filtre serveur), rechargée à chaque changement de critère.
  private allTracks = toSignal(
    toObservable(this.criteria).pipe(
      switchMap((c) =>
        this.trackService.getTracks({ sort: c.sort, order: c.order, favorite: c.favorite }),
      ),
    ),
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

  // --- Pagination (côté client) ---
  private pageSize = 8;
  protected currentPage = signal(1);

  // Nombre total de pages (dérivé du nombre de résultats filtrés).
  protected totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredTracks().length / this.pageSize)),
  );

  // Les morceaux de la page courante (la page est bornée aux pages valides).
  protected pagedTracks = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const start = (page - 1) * this.pageSize;
    return this.filteredTracks().slice(start, start + this.pageSize);
  });

  // Liste des numéros de page [1, 2, …] pour les boutons.
  protected pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  protected goTo(page: number) {
    this.currentPage.set(Math.min(Math.max(1, page), this.totalPages()));
  }

  // Recherche : on filtre ET on revient à la première page.
  protected onSearch(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  // Change le critère de tri et revient à la page 1.
  protected setSort(sort: NonNullable<TrackQuery['sort']>) {
    this.sortBy.set(sort);
    this.currentPage.set(1);
  }

  protected toggleOrder() {
    this.sortOrder.update((o) => (o === 'asc' ? 'desc' : 'asc'));
  }

  protected toggleFavoritesOnly() {
    this.favoritesOnly.update((v) => !v);
    this.currentPage.set(1);
  }

  // Clic sur une carte -> navigation vers la fiche détail (route tracks/:id).
  protected openDetail(id: number) {
    this.router.navigate(['/tracks', id]);
  }

  // Bascule le statut favori (PATCH protégé par JWT) puis rechargement.
  protected toggleFavorite(track: Track) {
    const next = !track.favorite;
    this.trackService.update(track.id, { favorite: next }).subscribe(() => {
      this.reload.update((n) => n + 1);
      this.toast.success(next ? 'Ajouté aux favoris' : 'Retiré des favoris');
    });
  }

  // Suppression via l'API (DELETE protégé par JWT) puis rechargement.
  protected removeTrack(id: number) {
    this.trackService.remove(id).subscribe(() => {
      this.reload.update((n) => n + 1);
      this.toast.success('Morceau supprimé');
    });
  }
}
