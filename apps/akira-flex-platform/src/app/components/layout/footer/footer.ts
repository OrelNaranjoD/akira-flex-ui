import { Component } from '@angular/core'
import { Logotype } from '@core'

/**
 * Platform Footer Component - Dashboard footer with branding and version.
 */
@Component({
  selector: 'platform-footer',
  imports: [Logotype],
  template: `
    <footer class="flex items-center justify-center gap-3 bg-p-surface p-3 text-sm">
      <app-logotype size="small" />
      <span class="text-color-secondary">Versión {{ appVersion }}</span>
    </footer>
  `,
})
export class Footer {
  appVersion = '1.0.3'
}
