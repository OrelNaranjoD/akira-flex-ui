import { Component, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

/**
 * Tenant Menu Component - Business workflow-oriented navigation.
 * Organized by daily operations for PyME users.
 */
@Component({
  selector: 'app-tenant-menu',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  template: `
    <nav class="space-y-1">
      <!-- Dashboard -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Panel Principal' : null"
        [routerLinkActiveOptions]="{ exact: true }"
        routerLink=""
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'tachometer-alt']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Panel Principal</span>
      </a>

      <!-- Section Divider: Financial Management -->
      @if (!isCollapsed) {
        <div class="pt-4 pb-2">
          <p
            class="px-3 text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide"
          >
            Finanzas
          </p>
        </div>
      }

      <!-- Cash & Banking -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Caja y Bancos' : null"
        routerLink="cash"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'cash-register']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Caja y Bancos</span>
      </a>

      <!-- Accounts Receivable -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Cuentas por Cobrar' : null"
        routerLink="receivables"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'hand-holding-usd']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Por Cobrar</span>
      </a>

      <!-- Accounts Payable -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Cuentas por Pagar' : null"
        routerLink="payables"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'file-invoice-dollar']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Por Pagar</span>
      </a>

      <!-- Section Divider: Sales & Customers -->
      @if (!isCollapsed) {
        <div class="pt-4 pb-2">
          <p
            class="px-3 text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide"
          >
            Ventas
          </p>
        </div>
      }

      <!-- New Sale (Quick Access) -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] hover:text-white transition-all duration-200 group border border-[var(--color-primary)]/20' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Nueva Venta' : null"
        routerLink="sales/new"
        routerLinkActive="bg-[var(--color-primary)] text-white font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'plus-circle']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Nueva Venta</span>
      </a>

      <!-- Sales History -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Historial de Ventas' : null"
        routerLink="sales"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'shopping-cart']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Ventas</span>
      </a>

      <!-- Customers -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Clientes' : null"
        routerLink="customers"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'users']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Clientes</span>
      </a>

      <!-- Section Divider: Inventory -->
      @if (!isCollapsed) {
        <div class="pt-4 pb-2">
          <p
            class="px-3 text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide"
          >
            Inventario
          </p>
        </div>
      }

      <!-- Products -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Productos' : null"
        routerLink="products"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'box']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Productos</span>
      </a>

      <!-- Stock Management -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Gestión de Stock' : null"
        routerLink="inventory"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'warehouse']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Stock</span>
      </a>

      <!-- Suppliers -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Proveedores' : null"
        routerLink="suppliers"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'truck']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Proveedores</span>
      </a>

      <!-- Section Divider: Reports -->
      @if (!isCollapsed) {
        <div class="pt-4 pb-2">
          <p
            class="px-3 text-xs font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide"
          >
            Reportes
          </p>
        </div>
      }

      <!-- Reports -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Reportes' : null"
        routerLink="reports"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'chart-bar']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Reportes</span>
      </a>

      <!-- Divider -->
      <div
        [class]="
          isCollapsed
            ? 'border-t border-[var(--color-border)] my-2 mx-3'
            : 'border-t border-[var(--color-border)] my-4'
        "
      ></div>

      <!-- Settings -->
      <a
        [class]="
          'flex items-center h-10 rounded-lg hover:bg-[var(--color-muted)] text-sm leading-none text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-200 group' +
          (isCollapsed ? ' justify-center px-0' : ' gap-3 px-3 py-0')
        "
        [attr.title]="isCollapsed ? 'Configuración' : null"
        routerLink="settings"
        routerLinkActive="bg-[var(--color-muted)] text-[var(--color-primary)] font-medium"
      >
        <fa-icon
          class="flex items-center justify-center h-5 w-5 min-w-[1.25rem] flex-shrink-0"
          [icon]="['fas', 'cog']"
        ></fa-icon>
        <span [class]="isCollapsed ? 'hidden' : 'block'">Configuración</span>
      </a>
    </nav>
  `,
})
export class TenantMenu {
  @Input() isCollapsed = false
}
