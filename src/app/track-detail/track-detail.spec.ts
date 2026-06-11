import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { TrackDetail } from './track-detail';

describe('TrackDetail', () => {
  let component: TrackDetail;
  let fixture: ComponentFixture<TrackDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackDetail],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackDetail);
    // Input de route requis (transform numberAttribute).
    fixture.componentRef.setInput('id', 1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
