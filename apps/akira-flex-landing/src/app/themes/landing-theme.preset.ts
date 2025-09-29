import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const LandingTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
    accent: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '{gray.50}',
          50: '{gray.50}',
          100: '{gray.100}',
          200: '{gray.200}',
          300: '{gray.300}',
          400: '{gray.400}',
          500: '{gray.500}',
          600: '{gray.600}',
          700: '{gray.700}',
          800: '{gray.800}',
          900: '{gray.900}',
          950: '{gray.950}',
        },
        text: {
          color: '{gray.800}',
          muted: {
            color: '{gray.600}',
          },
        },
        border: {
          color: '{gray.200}',
        },
        content: {
          background: '{gray.0}',
          hover: {
            background: '{gray.100}',
          },
        },
      },
      dark: {
        surface: {
          0: '{gray.950}',
          50: '{gray.950}',
          100: '{gray.800}',
          200: '{gray.700}',
          300: '{gray.600}',
          400: '{gray.500}',
          500: '{gray.400}',
          600: '{gray.300}',
          700: '{gray.200}',
          800: '{gray.100}',
          900: '{gray.50}',
          950: '{gray.50}',
        },
        text: {
          color: '{gray.50}',
          muted: {
            color: '{gray.400}',
          },
        },
        border: {
          color: '{gray.700}',
        },
        content: {
          background: '{gray.900}',
          hover: {
            background: '{gray.800}',
          },
        },
      },
    },
  },
})
