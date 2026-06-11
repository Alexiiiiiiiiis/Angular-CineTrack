import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCard } from './track-card';
import { Track } from '../models/track';

const mockTrack: Track = {
  id: 1,
  title: 'Test',
  artist: 'Artist',
  album: 'Album',
  genre: 'Genre',
  durationSeconds: 200,
  year: 2020,
  rating: 8,
  favorite: false,
  coverUrl: 'https://picsum.photos/300',
};

describe('TrackCard', () => {
  let component: TrackCard;
  let fixture: ComponentFixture<TrackCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCard);
    // Input obligatoire.
    fixture.componentRef.setInput('track', mockTrack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
