import { definePreset, palette } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Custom theme preset based on the full structure of Aura.
 * Primary palette is set to 'purple' and surface palette is set to 'stone'.
 * This ensures that all components.
 */
export const PurpleStoneTheme = definePreset(Aura, {
  semantic: {
    primary: palette('{purple}'),
    colorScheme: {
      light: {
        surface: palette('{stone}'),
      },
      dark: {
        surface: palette('{stone}'),
      },
    },
    company: {
      color: '#005491',
      contrastColor: '#ffffff',
    },
  },
})

export default PurpleStoneTheme
