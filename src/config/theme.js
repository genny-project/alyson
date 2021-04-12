import { extendTheme } from '@chakra-ui/react'

const defaultProjectTheme = {
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
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
      200: 'linear-gradient(135deg, #4FD1C5, #4299E1)',
      300: 'linear-gradient(135deg, #38B2AC, #3182CE)',
      400: 'linear-gradient(135deg, #319795, #2B6CB0)',
      500: 'linear-gradient(135deg, #4FD1C5, #4299E1)',
      600: 'linear-gradient(135deg, #38B2AC, #3182CE)',
      700: 'linear-gradient(135deg, #319795, #2B6CB0)',
      800: 'linear-gradient(135deg, #4FD1C5, #4299E1)',
      900: 'linear-gradient(135deg, #38B2AC, #3182CE)',
    },
  },
  textStyles: {
    head1: {
      fontSize: '2xl',
      fontWeight: 700,
    },
    head2: {
      fontSize: '2xl',
      fontWeight: 400,
    },
    head3: {
      fontSize: '2xl',
      fontWeight: 400,
      color: 'gray.500',
    },
    body1: {
      fontSize: 'md',
      fontWeight: 700,
    },
    body2: {
      fontSize: 'md',
      fontWeight: 400,
    },
    body3: {
      fontSize: 'md',
      fontWeight: 400,
      color: 'gray.500',
    },
    tail1: {
      fontSize: 'xs',
      fontWeight: 700,
    },
    tail2: {
      fontSize: 'xs',
      fontWeight: 400,
    },
    tail3: {
      fontSize: 'xs',
      fontWeight: 400,
      color: 'gray.500',
    },
  },
  components: {
    Button: {
      variants: {
        'custom-button': {
          bg: 'green.100',
          size: 'md',
          height: '48px',
          width: '200px',
          border: '2px',
          borderColor: 'red.500',
        },
      },
    },
    Box: {
      variants: {
        'card-one': {
          boxShadow: 'lg',
          p: '6',
          rounded: 'md',
          bg: 'white',
        },
        'card-two': {
          boxShadow: 'lg',
          p: '6',
          rounded: 'md',
          bg: 'white',
        },
        'card-three': {
          boxShadow: 'lg',
          p: '6',
          rounded: 'md',
          bg: 'white',
        },
      },
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
