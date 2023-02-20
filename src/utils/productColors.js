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
const buttonBackgroundColors = {
  lojing: 'product.secondary',
  alyson: 'product.primary',
  internmatch: 'product.primary',
}
const dropZoneTextHoverColors = {
  lojing: '#4d4d4d',
}
const switchColors = {
  lojing: 'orange',
}
const lightColors = {
  alyson: 'product.gray50',
}
const appWrapperInlinePaddings = {
  lojing: 'clamp(1.25rem, 5vw, 7.5rem)',
}
const tableStyles = {
  lojing: 'striped',
}

const tplVertJustifies = {
  lojing: 'center',
}

const tplHoriJustifies = {
  lojing: 'center',
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

  const buttonBackgroundColor = buttonBackgroundColors[clientId] || theme.colors.primary['100']
  const dropZoneTextHoverColor = dropZoneTextHoverColors[clientId] || theme.colors.text.dark

  const lightColor = lightColors[clientId] || theme.colors.background['light']
  const appWrapperInlinePadding = appWrapperInlinePaddings[clientId] || ''
  const switchColor = switchColors[clientId] || 'primary'

  const tableStyle = tableStyles[clientId] || 'simple'

  const tplVertJustify = tplVertJustifies[clientId] || 'flex-start'
  const tplHoriJustify = tplHoriJustifies[clientId] || 'flex-start'

  return {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldHoverTextColor,
    fieldTextColor,
    fieldHoverBackgroundColor,
    labelTextColor,
    borderRadius,
    buttonBackgroundColor,
    dropZoneTextHoverColor,
    lightColor,
    appWrapperInlinePadding,
    switchColor,
    tableStyle,
    tplVertJustify,
    tplHoriJustify,
  }
}

export default useProductColors
