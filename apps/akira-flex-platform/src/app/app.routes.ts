import { Routes } from '@angular/router'

/**
 * Platform routes configuration.
 */
export const ROUTES: Routes = [
  {
    path: '',
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
