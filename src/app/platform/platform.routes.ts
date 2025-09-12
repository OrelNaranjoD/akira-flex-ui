import { Routes } from '@angular/router'
import { PlatformLayout } from './components/platform-layout/platform-layout'
import { PlatformHomePage } from './pages/platform-home/platform-home'

/**
 * Platform routes configuration.
 */
export const PLATFORM_ROUTES: Routes = [
  {
    path: '',
    component: PlatformLayout,
    children: [{ path: '', component: PlatformHomePage }],
  },
]
