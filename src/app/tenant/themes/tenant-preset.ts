import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const TenantPreset = definePreset(Aura, {
  semantic: {
    primary: {
      0: '{emerald.50}',
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.500}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '{emerald.50}',
          50: '{emerald.50}',
          100: '{emerald.100}',
          200: '{emerald.200}',
          300: '{emerald.300}',
          400: '{emerald.400}',
          500: '{emerald.500}',
          600: '{emerald.600}',
          700: '{emerald.700}',
          800: '{emerald.800}',
          900: '{emerald.900}',
          950: '{emerald.950}',
        },
        primary: {
          color: '{emerald.700}',
          contrastColor: '#ffffff',
          hoverColor: '{emerald.800}',
          activeColor: '{emerald.900}',
        },
      },
      dark: {
        surface: {
          0: '{emerald.950}',
          50: '{emerald.950}',
          100: '{emerald.900}',
          200: '{emerald.800}',
          300: '{emerald.700}',
          400: '{emerald.600}',
          500: '{emerald.500}',
          600: '{emerald.400}',
          700: '{emerald.300}',
          800: '{emerald.200}',
          900: '{emerald.100}',
          950: '{emerald.50}',
        },
        primary: {
          color: '{emerald.300}',
          contrastColor: '{emerald.950}',
          hoverColor: '{emerald.200}',
          activeColor: '{emerald.100}',
        },
      },
    },
  },
})
