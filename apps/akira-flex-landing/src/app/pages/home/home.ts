import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Chip } from 'primeng/chip'
import { Subscription } from '../subscription/subscription'

/**
 * Landing home component with hero section.
 */
@Component({
  selector: 'landing-home',
  imports: [Chip, Subscription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
