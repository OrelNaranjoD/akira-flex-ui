import { Component } from '@angular/core'
import { Logotype } from '../../../../core/components/logotype/logotype'

/**
 * Platform Footer Component - Dashboard footer with branding and version.
 */
@Component({
  selector: 'app-platform-footer',
  imports: [Logotype],
  template: `
    <footer
      class="px-6 py-2 bg-[var(--color-card)] text-[var(--color-muted-foreground)] border-t border-[var(--color-border)]"
    >
      <div class="relative flex items-center justify-center text-sm">
        <div class="flex items-center">
          <app-logotype size="small"></app-logotype>
        </div>
        <div class="absolute right-0 flex items-center gap-2">
          <span class="text-[var(--color-muted-foreground)]">Version {{ appVersion }}</span>
        </div>
      </div>
    </footer>
  `,
})
export class PlatformFooter {
  appVersion = '1.0.3'
}
