import { Component } from '@angular/core'
import { Logotype } from '../../../core/components/logotype/logotype'

/**
 * Platform Footer Component - Dashboard footer with branding and version.
 */
@Component({
  selector: 'app-platform-footer',
  imports: [Logotype],
  template: `
    <footer class="flex items-center justify-center gap-3 bg-p-surface p-3 text-sm">
      <app-logotype size="small"></app-logotype>
      <span class="text-color-secondary">Versión {{ appVersion }}</span>
    </footer>
  `,
})
export class PlatformFooter {
  appVersion = '1.0.3'
}
