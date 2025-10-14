import { definePreset, palette } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Custom theme preset based on the full structure of Aura.
 * Primary palette is set to 'sky' and surface palette is set to 'zinc'.
 * This ensures that all components.
 */
export const SkyZincTheme = definePreset(Aura, {
  semantic: {
    primary: palette('{sky}'),
    colorScheme: {
      light: {
        surface: palette('{zinc}'),
      },
      dark: {
        surface: palette('{zinc}'),
      },
    },
    company: {
      color: '#005491',
      contrastColor: '#ffffff',
    },
  },
})

export default SkyZincTheme
