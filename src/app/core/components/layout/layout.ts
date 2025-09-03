import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Footer } from './footer/footer'
import { Menu } from './menu/menu'
import { Header } from './header/header'
import { FontAwesomeService } from '../../services/font-awesome.service'

/**
 * Layout component for the main application structure.
 */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Footer, Menu, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  /**
   * FontAwesome service instance.(Important for icons initialization).
   */
  private readonly fontAwesomeService = inject(FontAwesomeService)
}
