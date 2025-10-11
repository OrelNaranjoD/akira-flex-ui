import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Custom theme based on Aura with primary in purple and surface in stone for both light and dark.
 * Everything else remains the same as in the original Aura.
 */
export const PurpleStoneTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{purple.50}',
      100: '{purple.100}',
      200: '{purple.200}',
      300: '{purple.300}',
      400: '{purple.400}',
      500: '{purple.500}',
      600: '{purple.600}',
      700: '{purple.700}',
      800: '{purple.800}',
      900: '{purple.900}',
      950: '{purple.950}',
    },
    info: { color: '{sky.500}', contrastColor: '{stone.950}' },
    success: { color: '{green.500}', contrastColor: '{stone.950}' },
    warning: { color: '{yellow.500}', contrastColor: '{stone.950}' },
    danger: { color: '{red.500}', contrastColor: '#ffffff' },
    company: { color: '{blue.900}', contrastColor: '#ffffff' },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{stone.50}',
          100: '{stone.100}',
          200: '{stone.200}',
          300: '{stone.300}',
          400: '{stone.400}',
          500: '{stone.500}',
          600: '{stone.600}',
          700: '{stone.700}',
          800: '{stone.800}',
          900: '{stone.900}',
          950: '{stone.950}',
        },
        app: {
          background: '{surface.50}',
        },
      },
      dark: {
        surface: {
          0: '{slate.950}',
          50: '{slate.900}',
          100: '{slate.800}',
          200: '{slate.700}',
          300: '{slate.600}',
          400: '{slate.500}',
          500: '{slate.400}',
          600: '{slate.300}',
          700: '{slate.200}',
          800: '{slate.100}',
          900: '{slate.50}',
          950: '{slate.0}',
        },
        app: {
          background: '{surface.950}',
        },
      },
    },
  },
  css: ({ dt }) => `
    body {
      background-color: ${dt('app.background')};
      color: ${dt('text.color')};
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  `,
})

export default PurpleStoneTheme
