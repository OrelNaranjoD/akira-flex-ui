import { RenderMode, type ServerRoute } from '@angular/ssr'

/**
 * Server routes for the application.
 * These routes define how specific paths should be rendered on the server.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'customers/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'customers/:id/edit',
    renderMode: RenderMode.Server,
  },
  {
    path: 'inventory/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'inventory/:id/edit',
    renderMode: RenderMode.Server,
  },
  {
    path: 'inventory/:id/movements',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
] satisfies ServerRoute[]
