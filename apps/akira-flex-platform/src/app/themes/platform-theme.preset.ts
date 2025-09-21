import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const PlatformTheme = definePreset(Aura, {
  semantic: {
    primary: {
      0: '#ffffff',
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
    accent: {
      0: '#ffffff',
      50: '{fuchsia.50}',
      100: '{fuchsia.100}',
      200: '{fuchsia.200}',
      300: '{fuchsia.300}',
      400: '{fuchsia.400}',
      500: '{fuchsia.500}',
      600: '{fuchsia.600}',
      700: '{fuchsia.700}',
      800: '{fuchsia.800}',
      900: '{fuchsia.900}',
      950: '{fuchsia.950}',
    },
    surface: {
      0: '{zinc.950}',
      100: '{zinc.100}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          100: '{zinc.100}',
        },
        primary: {
          color: '{purple.600}',
          contrastColor: '#ffffff',
          hoverColor: '{purple.700}',
          activeColor: '{purple.800}',
        },
        accent: {
          color: '{fuchsia.500}',
          contrastColor: '#ffffff',
          hoverColor: '{fuchsia.600}',
          activeColor: '{fuchsia.700}',
        },
      },
      dark: {
        surface: {
          0: '{zinc.950}',
          100: '{zinc.800}',
        },
        primary: {
          color: '{purple.300}',
          contrastColor: '{zinc.950}',
          hoverColor: '{purple.200}',
          activeColor: '{purple.100}',
        },
        accent: {
          color: '{fuchsia.300}',
          contrastColor: '{zinc.950}',
          hoverColor: '{fuchsia.200}',
          activeColor: '{fuchsia.100}',
        },
      },
    },
  },
})
