import { ChangeDetectionStrategy, Component, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { TrackService } from '../services/track';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';

@Component({
  selector: 'app-track-detail',
  imports: [DurationFormatPipe, RouterLink],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDetail {
  // Le paramètre de route :id (chaîne) est converti en number.
  id = input.required({ transform: numberAttribute });
  private service = inject(TrackService);

  // Le flux d'id -> switchMap -> GET /tracks/:id -> signal.
  protected track = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.service.getTrack(id))),
  );
}
