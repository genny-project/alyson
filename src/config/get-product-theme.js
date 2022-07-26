import { defaultProjectTheme } from './theme'

const productBasedDefaultColors = {
  lojing: {
    primary: '#024754',
    primary100: '#E6F3F4',
    primary400: '#00596D',

    secondary: '#F18B32',
    secondary100: '#FFF6F0',
    secondary200: '#F8DFC8',
    secondaryAccent: '#EF8567',
    secondaryLight: '#FFF6F0',

    gray: '#F4F5F5',
    gray100: '#F4F5F5',
    gray700: '#33475B',
    grayMedium: '#C4C4C4',
    darkGray: '#33475B',

    white: '#FFFFFF',
  },

  alyson: {
    primary: '#00596D',
    secondary: '#F18B32',
    gray: '#F4F5F5',
  },
}

const productBasedDefaultFonts = {
  lojing: {
    headerFont: 'Proxima Nova, Nunito, sans-serif',
    bodyFont: 'Proxima Nova, Nunito, sans-serif',
    sidebarFont: 'Proxima Nova, Nunito, sans-serif',
  },
}

const productBasedDefaultTextStyles = {
  lojing: {
    bodyText100: {
      fontSize: 'md',
      fontWeight: 700,
      opacity: 0.9,
    },
    errorText: {
      fontSize: 'sm',
      fontWeight: 400,
      color: 'red.500',
      opacity: 0.9,
      marginTop: '0.5rem',
    },
  },
}

const getProductTheme = (
  realm,
  defaultProductColours,
  defaultProductFonts,
  defaultProductTextStyles,
) => {
  const defaultThemeColours = defaultProjectTheme.colors || ''
  const defaultThemeFonts = defaultProjectTheme.fonts || ''
  const defaultThemeTextStyles = defaultProjectTheme.textStyles || ''

  const productThemes = {
    colors: {
      product: defaultProductColours || productBasedDefaultColors[realm],
      ...defaultThemeColours,
    },

    fonts: {
      product: defaultProductFonts || productBasedDefaultFonts[realm],
      ...defaultThemeFonts,
    },

    textStyles: {
      product: defaultProductTextStyles || productBasedDefaultTextStyles[realm],
      ...defaultThemeTextStyles,
    },
  }
  return productThemes
}

export default getProductTheme