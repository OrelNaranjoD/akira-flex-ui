import { Component } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

/**
 * Menu component for displaying the application's menu section.
 */
@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {}
