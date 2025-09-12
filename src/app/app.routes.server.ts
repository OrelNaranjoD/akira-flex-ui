import { RenderMode, ServerRoute } from '@angular/ssr'

export const serverRoutes: ServerRoute[] = [
  // Landing routes - SSR/SSG Server Side Rendering / Static Site Generation
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  // Platform routes - CSR Client Side Rendering
  {
    path: 'platform',
    renderMode: RenderMode.Client,
  },
  {
    path: 'platform/**',
    renderMode: RenderMode.Client,
  },
  // Tenant routes - CSR Client Side Rendering
  {
    path: 'tenant/:tenantId',
    renderMode: RenderMode.Client,
  },
  {
    path: 'tenant/:tenantId/**',
    renderMode: RenderMode.Client,
  },
]
