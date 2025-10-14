import { Component, input, ChangeDetectionStrategy } from '@angular/core'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

/**
 * Component overlay showing a loading spinner during theme transitions.
 */
@Component({
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading.html',
  styleUrls: ['./loading.css'],
})
export class Loading {
  isLoading = input(true)
}
