import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

// Pilote la route /favorites par la config : si la fonctionnalité est
// désactivée, on redirige vers /tracks (la page n'existe pas pour l'utilisateur).
export const favoritesFeatureGuard: CanActivateFn = () => {
  const router = inject(Router);
  return environment.features.favorites ? true : router.createUrlTree(['/tracks']);
};
