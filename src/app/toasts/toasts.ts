import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.html',
  styleUrl: './toasts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toasts {
  protected toast = inject(ToastService);
}
