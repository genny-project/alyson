import { defaultProjectTheme } from './theme'

const productBasedDefaultColors = {
  lojing: {
    primary: '#024754',
    primary100: '#E6F3F4',
    primary400: '#00596D',
    primary500: '#004654',

    secondary: '#F18B32',
    secondary100: '#FFF6F0',
    secondary200: '#F8DFC8',
    secondaryAccent: '#EF8567',
    secondary400: '#EF8567',
    secondaryLight: '#FFF6F0',

    gray: '#F4F5F5',
    gray50: '#F6F6F6',
    gray100: '#F4F5F5',
    gray700: '#33475B',
    gray800: '#4D4D4D',
    grayMedium: '#C4C4C4',
    darkGray: '#33475B',

    white: '#FFFFFF',
    dark: '#000000',

    gradient100: 'linear-gradient(340deg, #EF8567, #F18B32)',

    sidebar: '#024754',
  },

  alyson: {
    primary: '#224371',
    primary100: '#AAE3E2',

    secondary: '#EA5024',
    secondaryLight: '#fdede9',

    gray: '#808080',
    gray50: '#F6F6F6',
    gray100: '#BDC5CD',

    gray700: '#808080',

    white: '#FFFFFF',
    dark: '#000000',

    sidebar: '#063231',
    header: '#red',
  },
}

const productBasedDefaultFonts = {
  lojing: {
    headerFont: 'Proxima Nova, Nunito, sans-serif',
    bodyFont: 'Proxima Nova, Nunito, sans-serif',
  },

  alyson: {
    headerFont: 'Roboto, sans-serif',
    bodyFont: 'Roboto, sans-serif',
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
  alyson: {
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
      product: { ...productBasedDefaultColors[realm], ...defaultProductColours },
      sidebar: {
        background: productBasedDefaultColors[realm]?.sidebar,
      },
      header: {
        background: productBasedDefaultColors[realm]?.header,
      },
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
