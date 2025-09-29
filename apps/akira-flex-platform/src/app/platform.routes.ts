import { Routes } from '@angular/router'

/**
 * Platform routes configuration.
 */
export const PLATFORM_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/platform-layout/platform-layout').then((m) => m.PlatformLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/platform-home/platform-home').then((m) => m.PlatformHomePage),
      },
    ],
  },
]
