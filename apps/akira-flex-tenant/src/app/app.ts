import { Component, ChangeDetectionStrategy } from '@angular/core'
import { RouterOutlet } from '@angular/router'

/**
 * The root component of the application.
 */
@Component({
  selector: 'tenant-app',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet /> `,
})
export class App {}
