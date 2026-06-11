import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { HighlightFavorite } from './highlight-favorite';

describe('HighlightFavorite', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [
        HighlightFavorite,
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
      ],
    });
    // input.required() nécessite un contexte d'injection.
    const directive = TestBed.runInInjectionContext(() => TestBed.inject(HighlightFavorite));
    expect(directive).toBeTruthy();
  });
});
