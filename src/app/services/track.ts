import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Track } from '../models/track';
import { environment } from '../../environments/environment';

// Options de tri / filtrage côté serveur.
export interface TrackQuery {
  sort?: 'title' | 'artist' | 'year' | 'rating' | 'durationSeconds';
  order?: 'asc' | 'desc';
  favorite?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TrackService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/tracks`;

  getTracks(query: TrackQuery = {}) {
    let params = new HttpParams();
    if (query.sort) {
      params = params.set('_sort', query.sort).set('_order', query.order ?? 'asc');
    }
    if (query.favorite) {
      params = params.set('favorite', 'true');
    }
    return this.http.get<Track[]>(this.baseUrl, { params });
  }

  getTrack(id: number) {
    return this.http.get<Track>(`${this.baseUrl}/${id}`);
  }

  search(query: string) {
    const params = new HttpParams().set('q', query);
    return this.http.get<Track[]>(this.baseUrl, { params });
  }

  // --- Écritures (nécessitent le token JWT ajouté par l'intercepteur) ---

  create(track: Omit<Track, 'id'>) {
    return this.http.post<Track>(this.baseUrl, track);
  }

  update(id: number, changes: Partial<Track>) {
    return this.http.patch<Track>(`${this.baseUrl}/${id}`, changes);
  }

  remove(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
