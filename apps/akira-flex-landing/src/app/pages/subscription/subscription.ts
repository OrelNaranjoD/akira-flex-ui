import { Component, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'

/**
 * Landing subscription component.
 */
@Component({
  selector: 'landing-subscription',
  imports: [CommonModule, ButtonModule, CardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subscription.html',
  styles: [],
})
export class Subscription {}
