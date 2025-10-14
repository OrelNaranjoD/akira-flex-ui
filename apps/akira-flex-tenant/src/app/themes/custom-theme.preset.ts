import { definePreset, palette } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Custom theme preset based on the full structure of Aura.
 * Primary palette is set to 'teal' and surface palette is set to 'slate'.
 * This ensures that all components.
 */
export const TealSlateTheme = definePreset(Aura, {
  semantic: {
    primary: palette('{teal}'),
    colorScheme: {
      light: {
        surface: palette('{slate}'),
      },
      dark: {
        surface: palette('{slate}'),
      },
    },
    company: {
      color: '#005491',
      contrastColor: '#ffffff',
    },
  },
})

export default TealSlateTheme
