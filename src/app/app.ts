import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { Toasts } from './toasts/toasts';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Toasts],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected auth = inject(AuthService);
  // Pilote l'affichage du lien Favoris (config simple).
  protected favoritesEnabled = environment.features.favorites;
}
