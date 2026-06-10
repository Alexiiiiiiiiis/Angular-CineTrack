import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  protected auth = inject(AuthService);
  private router = inject(Router);

  // Champs du formulaire (pré-remplis avec le compte de démo).
  protected email = signal('demo@ipssi.fr');
  protected password = signal('password123');
  protected error = signal<string | null>(null);

  onSubmit(event: Event) {
    event.preventDefault();
    this.error.set(null);
    this.auth.login(this.email(), this.password()).subscribe({
      next: () => this.router.navigate(['/tracks']),
      error: () => this.error.set('Identifiants invalides'),
    });
  }

  logout() {
    this.auth.logout();
  }
}
