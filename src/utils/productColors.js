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
  alyson: 'striped',
}
const tableDropShadows = {
  lojing: '0',
  alyson: '5px 8px 0.75rem #aaa',
}
const tableBorderRadii = {
  lojing: 'none',
  alyson: '2.5rem',
}
const tableHeaderTextStyles = {
  lojing: 'tail.1',
  alyson: 'internmatch.strongText',
}

const tableMarginXValues = {
  lojing: '5',
  alyson: '0',
}

const tableBackgroundLightColors = {
  lojing: 'white',
  alyson: '#EDF8F8',
}

const tableBackgroundDarkColors = {
  lojing: 'gray.700',
  alyson: '#E0F2F2',
}

const tableDividerColors = {
  lojing: 'white',
  alyson: '#DAE9E9',
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
  const tableDropShadow = tableDropShadows[clientId] || '0 0 0 white'
  const tableBorderRadius = tableBorderRadii[clientId] || 'none'
  const tableHeaderTextStyle = tableHeaderTextStyles[clientId] || 'tail.1'
  const tableMarginX = tableMarginXValues[clientId] || '5'
  const tableBackgroundLightColor = tableBackgroundLightColors[clientId] || 'white'
  const tableBackgroundDarkColor = tableBackgroundDarkColors[clientId] || 'gray.700'
  const tableDividerColor = tableDividerColors[clientId] || 'white'

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
    tableDropShadow,
    tableBorderRadius,
    tableHeaderTextStyle,
    tableMarginX,
    tableBackgroundDarkColor,
    tableBackgroundLightColor,
    tableDividerColor,
  }
}

export default useProductColors
