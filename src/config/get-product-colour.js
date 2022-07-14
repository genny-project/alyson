import { defaultProjectTheme } from './theme'

const productBasedDefaultColours = {
  lojing: {
    primary: '#F18B32',
    secondary: '#00596D',
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
