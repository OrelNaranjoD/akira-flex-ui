import { definePreset, palette } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const PlatformPreset = definePreset(Aura, {
  semantic: {
    primary: palette('purple'),
    colorScheme: {
      light: {
        surface: {
          0: '{purple}',
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
        primary: {
          color: '{purple.700}',
          contrastColor: '#ffffff',
          hoverColor: '{purple.800}',
          activeColor: '{purple.900}',
        },
      },
      dark: {
        surface: {
          0: '#1a0c2c',
          50: '{purple.950}',
          100: '{purple.900}',
          200: '{purple.800}',
          300: '{purple.700}',
          400: '{purple.600}',
          500: '{purple.500}',
          600: '{purple.400}',
          700: '{purple.300}',
          800: '{purple.200}',
          900: '{purple.100}',
          950: '{purple.50}',
        },
        primary: {
          color: '{purple.300}',
          contrastColor: '{purple.950}',
          hoverColor: '{purple.200}',
          activeColor: '{purple.100}',
        },
      },
    },
  },
})
