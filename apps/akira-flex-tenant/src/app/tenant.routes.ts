import { Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'

export const TENANT_ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/tenant-sign-in').then((m) => m.SignInComponent),
      },
      {
        path: 'password-recovery',
        loadComponent: () =>
          import('./pages/auth/tenant-password-recovery').then((m) => m.PasswordRecoveryComponent),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/tenant-layout/tenant-layout').then((m) => m.TenantLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/tenant-home/tenant-home').then((m) => m.TenantHomeComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('@core').then((m) => m.PageNotFoundComponent),
  },
]
