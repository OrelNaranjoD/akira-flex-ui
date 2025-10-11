import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Custom theme preset based on Aura with primary in sky and surface in zinc for both light and dark.
 * Everything else remains the same as in the original Aura.
 */
export const SkyZincTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}',
    },
    info: { color: '{sky.500}', contrastColor: '{zinc.950}' },
    success: { color: '{green.500}', contrastColor: '{zinc.950}' },
    warning: { color: '{yellow.500}', contrastColor: '{zinc.950}' },
    danger: { color: '{red.500}', contrastColor: '#ffffff' },
    company: { color: '{blue.900}', contrastColor: '#ffffff' },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
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

export default SkyZincTheme
