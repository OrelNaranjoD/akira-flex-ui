import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Logotype } from '@core'

/**
 * Landing Footer Component.
 */
@Component({
  selector: 'landing-footer',
  imports: [Logotype],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  /**
   * Current year for copyright.
   */
  readonly currentYear = new Date().getFullYear()
}
