import { apiConfig } from 'config/get-api-config'
import { useTheme } from '@chakra-ui/react'

const fieldBackgroundColors = {
  lojing: 'product.gray',
  alyson: 'product.white',
}
const fieldBorderColors = {
  lojing: 'product.gray',
}
const fieldTextColors = {
  lojing: 'product.gray700',
}
const fieldHoverBackgroundColors = {
  lojing: 'product.secondary100',
  internmatch: 'product.primary',
  alyson: 'product.primary',
}
const fieldHoverBorderColors = {
  lojing: 'product.gray',
  internmatch: 'product.secondary',
  alyson: 'product.secondary',
}
const fieldHoverTextColors = {
  lojing: 'product.secondary',
}
const labelTextColors = {
  alyson: 'product.gray700',
}
const borderRadiuses = {
  lojing: 'calc(0.25rem - 1px)',
}

const useProductColors = () => {
  const clientId = apiConfig?.clientId
  const theme = useTheme()

  const fieldBackgroundColor = fieldBackgroundColors[clientId] || theme.colors.background.light
  const fieldBorderColor = fieldBorderColors[clientId] || theme.colors.gray['600']
  const fieldTextColor = fieldTextColors[clientId] || theme.colors.gray['700']

  const fieldHoverBackgroundColor = fieldHoverBackgroundColors[clientId] || theme.colors.primary
  const fieldHoverBorderColor = fieldHoverBorderColors[clientId] || theme.colors.gray['600']
  const fieldHoverTextColor = fieldHoverTextColors[clientId] || theme.colors.text.dark

  const labelTextColor = labelTextColors[clientId] || theme.colors.gray['600']
  const borderRadius = borderRadiuses[clientId] || '0.5rem'

  return {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldHoverTextColor,
    fieldTextColor,
    fieldHoverBackgroundColor,
    labelTextColor,
    borderRadius,
  }
}

export default useProductColors
