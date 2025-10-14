import { Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in').then((m) => m.SignIn),
      },
      {
        path: 'password-recovery',
        loadComponent: () =>
          import('./pages/auth/password-recovery/password-recovery').then(
            (m) => m.PasswordRecovery
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then((m) => m.TenantHome),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('@core').then((m) => m.PageNotFound),
  },
]
