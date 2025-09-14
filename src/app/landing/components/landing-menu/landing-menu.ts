import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

/**
 * Landing Menu Component.
 */
@Component({
  selector: 'app-landing-menu',
  imports: [RouterLink],
  template: `
    <nav class="flex items-center gap-6 font-roboto font-medium uppercase text-sm tracking-wider">
      <a routerLink="" fragment="features">¿Por qué AkiraFlex?</a>
      <a routerLink="" fragment="modules">Módulos</a>
      <a routerLink="" fragment="sectors">Sectores</a>
      <a routerLink="" fragment="technology">Tecnología</a>
      <a routerLink="" fragment="pricing">Precios</a>
      <a routerLink="" fragment="testimonials">Testimonios</a>
    </nav>
  `,
  styles: [],
})
export class LandingMenu {}
