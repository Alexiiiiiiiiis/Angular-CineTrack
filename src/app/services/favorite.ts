import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track } from '../models/track';
import { environment } from '../../environments/environment';

// Service dédié aux endpoints Favoris du backend.
// Le champ `favorite` du Track reste la source de vérité de l'état.
@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/favorites`;

  // GET /favorites : liste des morceaux favoris (lecture publique).
  getFavorites() {
    return this.http.get<Track[]>(this.baseUrl);
  }

  // POST /favorites/:trackId : ajoute aux favoris (écriture protégée JWT).
  add(trackId: number) {
    return this.http.post<Track>(`${this.baseUrl}/${trackId}`, {});
  }

  // DELETE /favorites/:trackId : retire des favoris (écriture protégée JWT).
  remove(trackId: number) {
    return this.http.delete<Track>(`${this.baseUrl}/${trackId}`);
  }
}
