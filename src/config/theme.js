import { extendTheme } from '@chakra-ui/react'

const defaultProjectTheme = {
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
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
    gradient: {
      50: 'linear-gradient(135deg, #E6FFFA, #EBF8FF)',
      100: 'linear-gradient(135deg, #B2F5EA, #BEE3F8)',
      200: 'linear-gradient(135deg, #81E6D9, #90CDF4)',
      300: 'linear-gradient(135deg, #4FD1C5, #63B3ED)',
      400: 'linear-gradient(135deg, #38B2AC, #4299E1)',
      500: 'linear-gradient(135deg, #319795, #3182CE)',
      600: 'linear-gradient(135deg, #2C7A7B, #2B6CB0)',
      700: 'linear-gradient(135deg, #285E61, #2C5282)',
      800: 'linear-gradient(135deg, #234E52, #2A4365)',
      900: 'linear-gradient(135deg, #1D4044, #1A365D)',
    },
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
