import { Component, signal } from '@angular/core';
import { TrackList } from './track-list/track-list';
import { Track } from './models/track';

@Component({
  selector: 'app-root',
  imports: [TrackList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Le parent détient les données (en dur pour l'instant, l'API arrive en J3).
  protected tracks = signal<Track[]>([
    {
      id: 1, title: 'Symphonie n°5 en ut mineur', artist: 'Ludwig van Beethoven',
      album: 'Symphonies', genre: 'Symphonie', durationSeconds: 1880, year: 1808,
      rating: 10, favorite: true,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg/330px-Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg',
    },
    {
      id: 2, title: 'Les Quatre Saisons : Le Printemps', artist: 'Antonio Vivaldi',
      album: 'Il cimento dell\'armonia', genre: 'Concerto', durationSeconds: 600, year: 1725,
      rating: 9, favorite: true,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Vivaldi.jpg/330px-Vivaldi.jpg',
    },
    {
      id: 3, title: 'Clair de lune', artist: 'Claude Debussy',
      album: 'Suite bergamasque', genre: 'Impressionnisme', durationSeconds: 300, year: 1905,
      rating: 9, favorite: true,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Claude_Debussy_by_Atelier_Nadar.jpg/330px-Claude_Debussy_by_Atelier_Nadar.jpg',
    },
    {
      id: 4, title: 'Eine kleine Nachtmusik', artist: 'Wolfgang Amadeus Mozart',
      album: 'Sérénades', genre: 'Sérénade', durationSeconds: 360, year: 1787,
      rating: 9, favorite: false,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/The_Mozart_Family_-_Wolfgang_Amadeus_Mozart_headshot.jpg/330px-The_Mozart_Family_-_Wolfgang_Amadeus_Mozart_headshot.jpg',
    },
    {
      id: 5, title: 'Variations Goldberg : Aria', artist: 'Johann Sebastian Bach',
      album: 'Variations Goldberg', genre: 'Baroque', durationSeconds: 240, year: 1741,
      rating: 10, favorite: true,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Johann_Sebastian_Bach.jpg/330px-Johann_Sebastian_Bach.jpg',
    },
    {
      id: 6, title: 'Nocturne op. 9 n°2', artist: 'Frédéric Chopin',
      album: 'Nocturnes', genre: 'Romantisme', durationSeconds: 270, year: 1832,
      rating: 9, favorite: false,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Frederic_Chopin_photo.jpeg/330px-Frederic_Chopin_photo.jpeg',
    },
    {
      id: 7, title: 'Le Beau Danube bleu', artist: 'Johann Strauss II',
      album: 'Valses', genre: 'Valse', durationSeconds: 600, year: 1866,
      rating: 8, favorite: false,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Johann_Strauss_II_by_Fritz_Luckhardt_3-4_crop.jpg/330px-Johann_Strauss_II_by_Fritz_Luckhardt_3-4_crop.jpg',
    },
    {
      id: 8, title: 'Boléro', artist: 'Maurice Ravel',
      album: 'Boléro', genre: 'Orchestral', durationSeconds: 900, year: 1928,
      rating: 9, favorite: true,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Maurice_Ravel_1925.jpg/330px-Maurice_Ravel_1925.jpg',
    },
  ]);
}
