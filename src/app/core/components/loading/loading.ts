import { Component, input } from '@angular/core'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

/**
 * Component overlay showing a loading spinner during theme transitions.
 */
@Component({
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  template: `
    @if (isLoading()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-white/75 dark:bg-gray-900/75 backdrop-blur-sm"
        animate.enter="'enter'"
        animate.leave="'leave'"
      >
        <p-progress-spinner
          [style]="{ width: '50px', height: '50px' }"
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
        ></p-progress-spinner>
      </div>
    }
  `,
  styles: [
    `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      .enter {
        animation: fadeIn 2s ease-in-out forwards;
      }

      .leave {
        animation: fadeOut 2s ease-in-out forwards;
      }
    `,
  ],
})
export class Loading {
  isLoading = input(true)
}
