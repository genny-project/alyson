import { extendTheme } from '@chakra-ui/react'

export const defaultProjectTheme = {
  fonts: {
    internMatchHeader: `'Inconsolata', monospace`,
    internMatchBody: `'Almarai', sans-serif`,
  },
  colors: {
    background: {
      light: '#ffffff',
      dark: '#1A202C',
    },
    text: {
      light: '#000000',
      dark: '#ffffff',
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
      900: '#1A3B64',
    },
    primaryAlpha: {
      20: 'rgba(49,130,206,0.2)',
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
    gray: {
      50: '#E5E5E5',
      100: '#F4F5F5',
      200: '#EDEDED',
      300: '#C4C4C4',
      400: '#718096',
      500: '#9F9F9F',
      600: '#979797',
      700: '#808080',
      800: '#171923',
      900: '#234371',
    },
    purple: {
      100: '#7678ED',
      400: '#5162FA',
    },
    green: {
      50: '#AAE3E2',
      200: '#03DAC5',
      400: '#00AFAB',
      900: '#004753',
    },
    orange: {
      100: '#feefea',
      400: '#fbbea3',
      500: '#fc825c',
      600: '#f45d22',
      700: '#F36C24',
      800: '#F18B32',
    },
    teal: {
      500: '#00596D',
    },
    blackAlpha: {
      7: 'rgba(0, 0, 0, 0.07)',
      20: 'rgba(0,0,0,0.2)',
      50: 'rgba(0, 0, 0, 0.5)',
    },
    whiteAlpha: {
      40: 'rgba(255, 255, 255, 0.4)',
      80: 'rgba(255, 255, 255, 0.8)',
    },
    info: {
      50: '#EBF8FF',
      500: '#4299E1',
      900: '#1A365D',
    },
    error: {
      50: '#FEF4F4',
      500: '#F11E1B',
      900: '#700f0f',
    },
    warning: {
      50: '#FFFAF0',
      500: '#DD6B20',
      900: '#62300e',
    },
    success: {
      50: '#F0FFF4',
      100: '#DBFFFE',
      500: '#3AB8B5',
      800: '#00AFAB',
      900: '#133523',
    },
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

    internmatch: {
      primary100: 'E6EAEA',
      primary300: '#E0F2F2',
      primary400: '#96D5D3',
      primary: '#063231',
      primary400Alpha40: 'rgb(150 213 211 / .4)',

      secondary: '#EA5024',
      secondary400: '#E4BAC8',
      secondary400Alpha20: 'rgb(228 186 200 / .2)',

      accent: '#55B748',

      light: '#FFFFFF',
      lightAlpha40: 'rgb(255 255 255 / .4)',

      dark: '#000',
    },

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
      light: '#FFFFFF',
      dark: '#000000',

      gradient100: 'linear-gradient(340deg, #EF8567, #F18B32)',

      sidebar: '#024754',
    },
  },
  shadows: {
    md:
      '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
    lg: '0 4px 15px -2px rgba(0, 70, 84, 0.29)',
  },
  radii: {
    full: '9999px',
  },
  textStyles: {
    head: {
      1: {
        fontSize: '2xl',
        fontWeight: 700,
        opacity: 0.9,
      },
      2: {
        fontSize: '2xl',
        fontWeight: 400,
        opacity: 0.9,
      },
      3: {
        fontSize: '2xl',
        fontWeight: 400,
        opacity: 0.6,
      },
      error: {
        fontSize: '2xl',
        fontWeight: 400,
        color: 'red.500',
        opacity: 0.9,
      },
      success: {
        fontSize: '2xl',
        fontWeight: 400,
        color: 'green.500',
        opacity: 0.9,
      },
    },
    body: {
      1: {
        fontSize: 'md',
        fontWeight: 700,
        opacity: 0.9,
      },
      2: {
        fontSize: 'md',
        fontWeight: 400,
        opacity: 0.9,
      },
      3: {
        fontSize: 'md',
        fontWeight: 400,
        opacity: 0.6,
      },
      error: {
        fontSize: 'md',
        fontWeight: 400,
        color: 'red.500',
        opacity: 0.9,
      },
      success: {
        fontSize: 'md',
        fontWeight: 400,
        color: 'green.500',
        opacity: 0.9,
      },
    },
    tail: {
      1: {
        fontSize: 'xs',
        fontWeight: 700,
        opacity: 0.9,
      },
      2: {
        fontSize: 'xs',
        fontWeight: 400,
        opacity: 0.9,
      },
      3: {
        fontSize: 'xs',
        fontWeight: 400,
        opacity: 0.6,
      },
      error: {
        fontSize: 'xs',
        fontWeight: 400,
        color: 'red.500',
        opacity: 0.9,
      },
      success: {
        fontSize: 'xs',
        fontWeight: 400,
        color: 'green.500',
        opacity: 0.9,
      },
    },
    internmatch: {
      heading1: {
        fontSize: '6.88rem',
        fontWeight: 200,
        fontFamily: 'Editorial New',
        lineHeight: '1.28',
      },
      heading2: {
        fontSize: '4.25rem',
        fontWeight: 200,
        fontFamily: 'Editorial New',
        lineHeight: '1.28',
      },
      heading3: {
        fontSize: '2.63rem',
        fontWeight: 200,
        fontFamily: 'Editorial New',
        lineHeight: '1.29',
      },
      heading4: {
        fontSize: '1.63rem',
        fontWeight: 200,
        fontFamily: 'Editorial New',
        lineHeight: '1.27',
      },
      subHeading: {
        fontSize: '1.63rem',
        fontWeight: 500,
        fontFamily: 'Neue Montreal',
        lineHeight: '1.19',
      },
      body: {
        fontSize: '1rem',
        fontWeight: 400,
        fontFamily: 'Neue Montreal',
        lineHeight: '19px',
      },
      strongText: {
        fontSize: '16px',
        fontWeight: 700,
        fontFamily: 'Neue Montreal',
        lineHeight: '1.19',
      },
      buttonText: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.19',
      },
      speechBubble: {
        fontSize: '1rem',
        fontWeight: 200,
        lineHeight: '1.19',
      },
      iconText: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.19',
      },
      iconTextOnHighlight: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.19',
      },
      labelStyles: {
        fontSize: '.88rem',
        fontWeight: '200',
        lineHeight: '1.2',
        fontFamily: `'Inconsolata', sans-serif`,
      },
    },
  },
}

const getTheme = (projectTheme = defaultProjectTheme) =>
  extendTheme({
    styles: {
      global: {
        '*': {
          textRendering: 'optimizespeed !important',
        },
      },
    },
    components: {
      Button: {
        baseStyle: {
          lineHeight: 'inherit',
        },
      },
    },
    config: {
      initialColorMode: 'light',
    },
    ...projectTheme,
  })

export default getTheme
