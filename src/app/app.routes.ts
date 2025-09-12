import { Routes } from '@angular/router'

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.routes').then((m) => m.LANDING_ROUTES),
  },
  {
    path: 'platform',
    loadChildren: () => import('./platform/platform.routes').then((m) => m.PLATFORM_ROUTES),
  },
  {
    path: 'tenant/:tenantId',
    loadChildren: () => import('./tenant/tenant.routes').then((m) => m.TENANT_ROUTES),
  },
]
