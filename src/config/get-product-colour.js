import { defaultProjectTheme } from './theme'

const productBasedDefaultColours = {
  lojing: {
    primary: '#00596D',
    secondary: '#F18B32',
    gray: '#F4F5F5',
  },

  alyson: {
    primary: '#00596D',
    secondary: '#F18B32',
    gray: '#F4F5F5',
  },
}

const getProductColours = (realm, defaultProductColours) => {
  const defaultThemeColours = defaultProjectTheme.colors || ''
  const productColours = {
    colors: {
      product: defaultProductColours || productBasedDefaultColours[realm],
      ...defaultThemeColours,
    },
  }
  return productColours
}

export default getProductColours
