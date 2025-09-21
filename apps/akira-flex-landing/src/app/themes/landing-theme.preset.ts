import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const LandingTheme = definePreset(Aura, {
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
    },
    surface: {
      0: '{indigo.950}',
      100: '{indigo.100}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          100: '{indigo.100}',
        },
        primary: {
          color: '{sky.700}',
          contrastColor: '#ffffff',
          hoverColor: '{sky.800}',
          activeColor: '{sky.900}',
        },
        accent: {
          color: '{amber.500}',
          contrastColor: '#ffffff',
          hoverColor: '{amber.600}',
          activeColor: '{amber.700}',
        },
      },
      dark: {
        surface: {
          0: '{indigo.950}',
          100: '{indigo.800}',
        },
        primary: {
          color: '{sky.300}',
          contrastColor: '{indigo.950}',
          hoverColor: '{sky.200}',
          activeColor: '{sky.100}',
        },
        accent: {
          color: '{amber.300}',
          contrastColor: '{indigo.950}',
          hoverColor: '{amber.200}',
          activeColor: '{amber.100}',
        },
      },
    },
  },
})
