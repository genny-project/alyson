import { defaultProjectTheme } from './theme'

const productBasedDefaultColours = {
  lojing: {
    primary: '#F18B32',
    secondary: '#00596D',
  },
}

const getProductColours = realm => {
  const defaultThemeColours = defaultProjectTheme.colors || ''
  const productColours = {
    colors: {
      product: productBasedDefaultColours[realm],
      ...defaultThemeColours,
    },
  }
  return productColours
}

export default getProductColours
