import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { favoritesFeatureGuard } from './guards/favorites-feature-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tracks', pathMatch: 'full' },
  {
    path: 'tracks',
    loadComponent: () => import('./track-list/track-list').then((m) => m.TrackList),
  },
  {
    path: 'tracks/new',
    canActivate: [authGuard],
    loadComponent: () => import('./track-form/track-form').then((m) => m.TrackForm),
  },
  {
    path: 'tracks/:id',
    loadComponent: () => import('./track-detail/track-detail').then((m) => m.TrackDetail),
  },
  {
    path: 'tracks/:id/edit',
    canActivate: [authGuard],
    loadComponent: () => import('./track-form/track-form').then((m) => m.TrackForm),
  },
  {
    // Feature flag d'abord (sinon -> /tracks), puis auth (sinon -> /login).
    path: 'favorites',
    canActivate: [favoritesFeatureGuard, authGuard],
    loadComponent: () => import('./favorites/favorites').then((m) => m.Favorites),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
];
