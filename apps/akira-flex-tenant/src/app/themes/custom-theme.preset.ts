import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Theme based on Aura with primary in teal and surface in slate for both light and dark.
 * Everything else remains the same as in the original Aura.
 */
const TealSlateTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.300}',
      400: '{teal.400}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}',
    },
    info: { color: '{sky.500}', contrastColor: '{slate.950}' },
    success: { color: '{green.500}', contrastColor: '{slate.950}' },
    warning: { color: '{yellow.500}', contrastColor: '{slate.950}' },
    danger: { color: '{red.500}', contrastColor: '#ffffff' },
    company: { color: '{blue.900}', contrastColor: '#ffffff' },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
        app: {
          background: '{surface.50}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
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

export default TealSlateTheme
