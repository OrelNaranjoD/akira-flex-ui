import { Routes } from '@angular/router'
import { adminGuard } from './guards/admin.guard'

/**
 * Platform routes configuration.
 */
export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in').then((m) => m.SignIn),
      },
    ],
  },
  {
    path: '',
    canActivate: [adminGuard],
    loadComponent: () => import('./components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('@core').then((m) => m.PageNotFound),
  },
]
