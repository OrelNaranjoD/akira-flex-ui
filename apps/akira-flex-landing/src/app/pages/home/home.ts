import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Chip } from 'primeng/chip'

/**
 * Landing home component with hero section.
 */
@Component({
  selector: 'landing-home',
  imports: [Chip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
