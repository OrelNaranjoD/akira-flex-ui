import { Component, ChangeDetectionStrategy } from '@angular/core'
import { RouterOutlet } from '@angular/router'

/**
 * Root component that hosts the router outlet for the application.
 */
@Component({
  selector: 'landing-app',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet />`,
})
export class App {}
