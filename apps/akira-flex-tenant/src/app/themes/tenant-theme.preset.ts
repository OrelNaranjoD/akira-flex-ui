import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const TenantTheme = definePreset(Aura, {
  semantic: {
    primary: {
      0: '#ffffff',
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
    accent: {
      0: '#ffffff',
      50: '{coral.50}',
      100: '{coral.100}',
      200: '{coral.200}',
      300: '{coral.300}',
      400: '{coral.400}',
      500: '{coral.500}',
      600: '{coral.600}',
      700: '{coral.700}',
      800: '{coral.800}',
      900: '{coral.900}',
      950: '{coral.950}',
    },
    surface: {
      0: '{slate.950}',
      100: '{slate.100}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          100: '{slate.100}',
        },
        primary: {
          color: '{teal.600}',
          contrastColor: '#ffffff',
          hoverColor: '{teal.700}',
          activeColor: '{teal.800}',
        },
        accent: {
          color: '{coral.500}',
          contrastColor: '#ffffff',
          hoverColor: '{coral.600}',
          activeColor: '{coral.700}',
        },
      },
      dark: {
        surface: {
          0: '{slate.950}',
          100: '{slate.800}',
        },
        primary: {
          color: '{teal.300}',
          contrastColor: '{slate.950}',
          hoverColor: '{teal.200}',
          activeColor: '{teal.100}',
        },
        accent: {
          color: '{coral.300}',
          contrastColor: '{slate.950}',
          hoverColor: '{coral.200}',
          activeColor: '{coral.100}',
        },
      },
    },
  },
})
