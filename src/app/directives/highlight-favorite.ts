import { Directive, ElementRef, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
})
export class HighlightFavorite {
  // Reçoit un booléen : true si le morceau est un favori.
  appHighlightFavorite = input.required<boolean>();
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // effect() réagit automatiquement aux changements du signal d'entrée.
    effect(() => {
      this.el.nativeElement.style.outline = this.appHighlightFavorite()
        ? '2px solid gold'
        : 'none';
    });
  }
}
