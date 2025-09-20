import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Logotype } from '../../../core/components/logotype/logotype'

/**
 * Landing Footer Component.
 */
@Component({
  selector: 'app-landing-footer',
  imports: [RouterLink, Logotype],
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
                    <i class="mr-2 w-4" icon="pi pi-flag"></i>
                    Características
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="" fragment="pricing">
                    <i class="mr-2 w-4" icon="pi pi-money-bill-1"></i>
                    Precios
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="integrations">
                    <i class="mr-2 w-4" icon="pi pi-handshake"></i>
                    Integraciones
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="changelog">
                    <i class="mr-2 w-4" icon="pi pi-clock"></i>
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
                    <i class="mr-2 w-4" icon="pi pi-bookmark"></i>
                    Documentación
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="help">
                    <i class="mr-2 w-4" icon="pi pi-circle-question"></i>
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="contact">
                    <i class="mr-2 w-4" icon="pi pi-envelope"></i>
                    Contacto
                  </a>
                </li>
                <li>
                  <a class="flex items-center" routerLink="status">
                    <i class="mr-2 w-4" icon="pi pi-heart"></i>
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
