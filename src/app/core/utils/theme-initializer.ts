import { usePreset } from '@primeuix/themes'
import { LandingPreset } from '@landing/themes/landing-preset'
import { PlatformPreset } from '@platform/themes/platform-preset'
import { TenantPreset } from '@tenant/themes/tenant-preset'

export type DomainType = 'landing' | 'platform' | 'tenant'

/**
 * Detects the domain based on the hostname and applies the appropriate preset.
 * This function should be called before Angular bootstraps to prevent theme flashing.
 */
export function initializeTheme(): void {
  const domain = detectDomainFromHostname()
  applyPresetForDomain(domain)
  applyDomainClasses(domain)
}

/**
 * Gets the appropriate preset for the detected domain.
 * @returns The preset object for the current domain.
 */
export function getPresetForDomain(): typeof LandingPreset {
  if (typeof window === 'undefined') {
    return LandingPreset
  }

  const domain = detectDomainFromHostname()
  switch (domain) {
    case 'landing':
      return LandingPreset
    case 'platform':
      return PlatformPreset
    case 'tenant':
      return TenantPreset
    default:
      return LandingPreset
  }
}

/**
 * Detects the domain based on the current hostname.
 * @returns The detected domain type.
 */

interface AkiraWindow extends Window {
  __AKIRA_DOMAIN__?: DomainType
}

/**
 * Detects the domain based on the current hostname.
 * @returns The detected domain type.
 */
function detectDomainFromHostname(): DomainType {
  if (typeof window === 'undefined') return 'landing'

  // Check if domain was already detected by the HTML script
  const akiraWindow = window as AkiraWindow
  if (akiraWindow.__AKIRA_DOMAIN__) {
    return akiraWindow.__AKIRA_DOMAIN__
  }

  const hostname = window.location.hostname

  if (hostname.includes('platform') || hostname.includes('app')) {
    return 'platform'
  } else if (hostname.includes('tenant') || hostname.includes('client')) {
    return 'tenant'
  }

  return 'landing'
}

/**
 * Applies the appropriate preset based on the domain.
 * @param domain The domain to apply preset for.
 */
function applyPresetForDomain(domain: DomainType): void {
  switch (domain) {
    case 'landing':
      usePreset(LandingPreset)
      break
    case 'platform':
      usePreset(PlatformPreset)
      break
    case 'tenant':
      usePreset(TenantPreset)
      break
    default:
      usePreset(LandingPreset)
  }
}

/**
 * Applies domain-specific CSS classes to the document element.
 * @param domain The domain to apply classes for.
 */
function applyDomainClasses(domain: DomainType): void {
  if (typeof window === 'undefined') return

  const htmlElement = document.documentElement
  htmlElement.classList.remove('domain-landing', 'domain-platform', 'domain-tenant')
  htmlElement.classList.add(`domain-${domain}`)
}
