import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { email, form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  protected model = signal({ email: '', password: '' });

  protected loginForm = form(this.model, (path) => {
    required(path.email, { message: "L'email est requis" });
    email(path.email, { message: 'Email invalide' });
    required(path.password, { message: 'Le mot de passe est requis' });
  });

  // Passe à true au 1er envoi : affiche les erreurs même sans blur.
  protected submitted = signal(false);
  protected serverError = signal<string | null>(null);

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
    this.serverError.set(null);
    if (!this.loginForm().valid()) return;

    const { email, password } = this.model();
    this.auth.login(email, password).subscribe({
      next: () => this.router.navigate(['/tracks']),
      error: () => this.serverError.set('Identifiants invalides'),
    });
  }
}
