import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Chip } from 'primeng/chip'

/**
 * Landing home component with hero section.
 */
@Component({
  selector: 'app-landing-home',
  imports: [Chip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing-home.html',
  styleUrls: ['./landing-home.css'],
})
export class LandingHome {}
