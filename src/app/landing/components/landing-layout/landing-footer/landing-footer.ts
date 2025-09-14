import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Logotype } from '../../../../core/components/logotype/logotype'

/**
 * Landing Footer Component.
 */
@Component({
  selector: 'app-landing-footer',
  imports: [RouterLink, FontAwesomeModule, Logotype],
  template: `
    <footer
      class="bg-[var(--color-background)] text-[var(--color-muted-foreground)] border-t border-[var(--border)] mt-auto"
    >
      <div class="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 py-4">
        <div class="flex justify-between items-start">
          <!-- Company Info - Left side -->
          <div class="max-w-md">
            <div class="mb-4">
              <app-logotype size="small"></app-logotype>
            </div>
            <p class="mb-4">
              Plataforma moderna y flexible para la gestión integral de tu negocio. Diseñada con
              tecnologías de vanguardia para máximo rendimiento.
            </p>
            <p class="text-sm">
              &copy; {{ currentYear }} AkiraFlex. Todos los derechos reservados.
            </p>
          </div>

          <!-- Two columns aligned to the right -->
          <div class="grid grid-cols-2 gap-12">
            <!-- Product Links -->
            <div>
              <h4 class="font-semibold uppercase tracking-wider mb-4">Producto</h4>
              <ul class="space-y-2">
                <li>
                  <a class="flex items-center" routerLink="" fragment="features">
                    <fa-icon class="mr-2 w-4" [icon]="['far', 'flag']"></fa-icon>
                    Características
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="" fragment="pricing">
                    <fa-icon class="mr-2 w-4" [icon]="['far', 'money-bill-1']"></fa-icon>
                    Precios
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="integrations">
                    <fa-icon class="mr-2 w-4" [icon]="['far', 'handshake']"></fa-icon>
                    Integraciones
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="changelog">
                    <fa-icon class="mr-2 w-4" [icon]="['far', 'clock']"></fa-icon>
                    Novedades
                  </a>
                </li>
              </ul>
            </div>

            <!-- Support Links -->
            <div>
              <h4 class="text-base font-semibold uppercase tracking-wider mb-4">Soporte</h4>
              <ul class="space-y-2">
                <li>
                  <a class="flex items-center" routerLink="documentation">
                    <fa-icon class="mr-2 w-4" [icon]="['far', 'bookmark']"></fa-icon>
                    Documentación
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="help">
                    <fa-icon class="mr-2 w-4" [icon]="['far', 'circle-question']"></fa-icon>
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="contact">
                    <fa-icon class="mr-2 w-4" [icon]="['far', 'envelope']"></fa-icon>
                    Contacto
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="status">
                    <fa-icon class="mr-2 w-4" [icon]="['far', 'heart']"></fa-icon>
                    Estado del Sistema
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom Border -->
        <div class="mt-4 pt-4 border-t border-[var(--border)]">
          <div class="flex flex-col sm:flex-row justify-between items-center">
            <div class="flex space-x-6 mb-4 sm:mb-0">
              <a class="text-sm" routerLink="privacy">Política de Privacidad</a>
              <a class="text-sm" routerLink="terms">Términos de Servicio</a>
              <a class="text-sm" routerLink="cookies">Cookies</a>
            </div>
            <div class="text-sm">AkiraFlex • Desarrollado por Akira Software</div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class LandingFooter {
  /**
   * Current year for copyright.
   */
  readonly currentYear = new Date().getFullYear()
}
