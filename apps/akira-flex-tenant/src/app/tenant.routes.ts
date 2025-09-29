import { Routes } from '@angular/router'

export const TENANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/tenant-layout/tenant-layout').then((m) => m.TenantLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/tenant-home/tenant-home').then((m) => m.TenantHomePage),
      },
    ],
  },
]
