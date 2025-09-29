import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { config } from './app/app.config.server'

/**
 * Polyfill for ResizeObserver in SSR.
 */
if (typeof window === 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    /**
     * Observes the target element.
     */
    observe() {}

    /**
     * Stops observing the target element.
     */
    unobserve() {}

    /**
     * Disconnects the observer.
     */
    disconnect() {}
  }
}

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context)

export default bootstrap
