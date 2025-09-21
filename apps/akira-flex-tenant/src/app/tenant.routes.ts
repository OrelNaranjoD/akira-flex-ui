import { Routes } from '@angular/router'
import { TenantLayout } from './components/tenant-layout/tenant-layout'
import { TenantHomePage } from './pages/tenant-home/tenant-home'

export const TENANT_ROUTES: Routes = [
  {
    path: '',
    component: TenantLayout,
    children: [{ path: '', component: TenantHomePage }],
  },
]
