import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  id: number;
  email: string;
  name: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

const TOKEN_KEY = 'cinetrack_token';
const USER_KEY = 'cinetrack_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // Session restaurée depuis localStorage au démarrage (persistance).
  private tokenSignal = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly user = signal<User | null>(this.readStoredUser());

  readonly isLoggedIn = computed(() => this.tokenSignal() !== null);

  get token() {
    return this.tokenSignal();
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          this.tokenSignal.set(res.accessToken);
          this.user.set(res.user);
          localStorage.setItem(TOKEN_KEY, res.accessToken);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        }),
      );
  }

  logout() {
    this.tokenSignal.set(null);
    this.user.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  private readStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }
}
