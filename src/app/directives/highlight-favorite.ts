import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
  // Liaison d'hôte réactive : recalculée automatiquement quand l'input change.
  // (plus fiable que muter le DOM via ElementRef dans un effect)
  host: {
    '[style.outline]': "appHighlightFavorite() ? '2px solid gold' : 'none'",
  },
})
export class HighlightFavorite {
  // Reçoit un booléen : true si le morceau est un favori.
  appHighlightFavorite = input.required<boolean>();
}
