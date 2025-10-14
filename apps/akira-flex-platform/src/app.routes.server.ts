import { RenderMode, type ServerRoute } from '@angular/ssr'

/**
 * Server routes for the application.
 * These routes define how specific paths should be rendered on the server.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
] satisfies ServerRoute[]
