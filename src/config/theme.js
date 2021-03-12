import { extendTheme } from '@chakra-ui/react'

const defaultProjectTheme = {
  colors: {
    background: { light: '#ffffff', dark: '#171923' },
    text: {
      light: '#2D3748',
      dark: '#F7FAFC',
    },
    primary: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
    secondary: {
      50: '#FFF5F7',
      100: '#FED7E2',
      200: '#FBB6CE',
      300: '#F687B3',
      400: '#ED64A6',
      500: '#D53F8C',
      600: '#B83280',
      700: '#97266D',
      800: '#702459',
      900: '#521B41',
    },
    error: { 50: '#FFF5F5', 500: '#E53E3E' },
    warning: { 50: '#FFFAF0', 500: '#DD6B20' },
    success: { 50: '#F0FFF4', 500: '#38A169' },
  },
}

const getTheme = (projectTheme = defaultProjectTheme) =>
  extendTheme({
    config: {
      initialColorMode: 'light',
    },
    ...projectTheme,
  })
export default getTheme
