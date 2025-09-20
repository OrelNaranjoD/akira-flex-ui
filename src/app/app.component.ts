import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

/**
 * Root component that hosts the router outlet for the application.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
