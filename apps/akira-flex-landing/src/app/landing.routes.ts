import { Routes } from '@angular/router'
import { LandingLayout } from './components/landing-layout/landing-layout'
import { LandingHome } from './pages/landing-home/landing-home'

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    component: LandingLayout,
    children: [{ path: '', component: LandingHome }],
  },
]
