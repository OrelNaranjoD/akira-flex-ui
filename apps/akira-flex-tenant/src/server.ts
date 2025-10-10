import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node'
import express from 'express'
import { join } from 'node:path'
import cookieParser from 'cookie-parser'

const browserDistFolder = join(import.meta.dirname, '../browser')
const sharedAssetsFolder = join(import.meta.dirname, '../../../shared-assets')

const app = express()
const angularApp = new AngularNodeAppEngine()

/**
 * Serve shared assets like images, fonts, etc.
 */
app.use(
  express.static(sharedAssetsFolder, {
    maxAge: '1y',
    index: false,
  })
)

/**
 * Middleware to parse cookies from incoming requests.
 */
app.use(cookieParser())

/**
 * Serve static files from /browser.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
)

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next)
})

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4202
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`)
  })
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app)
