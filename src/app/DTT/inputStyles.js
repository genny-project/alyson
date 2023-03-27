import { useTheme } from '@chakra-ui/react'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import useProductColors from 'utils/productColors'

const useStyles = (hasValidData, isFocused, isInvalid = false) => {
  const realm = useGetProductName().toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()
  const theme = useTheme()

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    borderRadius,
    fieldTextColor,
  } = useProductColors()

  const maskFormatChars = {
    P: '[+0-9]',
    0: '[0-9]',
    a: '[A-Za-z]',
    '*': '[A-Za-z0-9]',
  }

  const inputGroupStyles = {
    w: 'full',
    h: 'auto',
    fontWeight: isProductInternMatch ? `normal` : 'medium',
    fontSize: 'sm',
    color:
      isInvalid && isProductInternMatch
        ? `${realm}.secondary`
        : isInvalid
        ? 'error.500'
        : isProductInternMatch
        ? `${realm}.primary`
        : fieldTextColor,
    bg:
      isInvalid && isProductInternMatch
        ? `${realm}.secondary400Alpha20`
        : isInvalid
        ? 'error.500'
        : isProductInternMatch && hasValidData
        ? `${realm}.primary400`
        : isProductInternMatch
        ? `${realm}.secondary400`
        : fieldBackgroundColor,
    border: 0,
    borderRadius: isProductInternMatch ? 'lg' : borderRadius,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor:
      isInvalid && isProductInternMatch
        ? `${realm}.secondary`
        : isInvalid
        ? 'error.50'
        : isProductInternMatch
        ? `${realm}.primary`
        : fieldBorderColor,
    outline: '0px',
    outlineOffset: 0,
    overflow: 'hidden',
    cursor: 'pointer',

    _hover: {
      bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
      borderColor: isProductInternMatch ? `${realm}.primary` : fieldHoverBorderColor,
      boxShadow: 'lg',
    },

    _focusVisible: {
      bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
      borderColor: isProductInternMatch ? `${realm}.primary` : 'product.secondary',
      boxShadow: 'initial',
    },
  }

  const inputStyles = {
    w: 'full',
    h: 'auto',
    fontWeight: isProductInternMatch ? `normal` : 'medium',
    fontSize: 'sm',
    color: isProductInternMatch ? `${realm}.primary` : fieldTextColor,
    bg:
      isProductInternMatch && hasValidData
        ? `${realm}.primary400`
        : isProductInternMatch
        ? `${realm}.secondary400`
        : fieldBackgroundColor,
    border: 0,
    borderRadius: isProductInternMatch ? 'lg' : borderRadius,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isProductInternMatch ? `${realm}.primary` : fieldBorderColor,
    outline: '0px',
    outlineOffset: 0,
    overflow: 'hidden',
    cursor: 'pointer',

    _hover: {
      bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
      borderColor: isProductInternMatch ? `${realm}.primary` : fieldHoverBorderColor,
      boxShadow: 'lg',
    },

    _focusVisible: {
      bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
      borderColor: isProductInternMatch ? `${realm}.primary` : 'product.secondary',
      boxShadow: 'initial',
    },

    _valid: {
      bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
      borderColor: isProductInternMatch ? `${realm}.primary` : fieldHoverBorderColor,
    },

    _invalid: {
      background: isProductInternMatch ? `${realm}.secondary400Alpha20` : 'error.50',
      borderColor: isProductInternMatch ? `${realm}.secondary` : 'error.500',
      color: isProductInternMatch ? `${realm}.secondary` : 'error.500',
    },

    _disabled: {
      borderColor: isProductInternMatch ? `${realm}.primary` : 'gray.300',
      background: isProductInternMatch ? `${realm}.primary` : 'gray.100',
      color: isProductInternMatch ? `${realm}.primary400` : 'inherit',
    },
  }

  const labelStyles = {
    position: 'absolute',
    zIndex: theme.zIndices.docked,
    top: isFocused ? '-1.5rem' : isProductInternMatch ? 4 : 3,
    left: 0,
    w: 'full',
    maxH: '47px',
    overflow: 'hidden',
    paddingEnd: 4,
    justifyContent: 'space-between',
    pointerEvents: 'none',
    transition: 'all 0.25s ease',
  }

  return { inputStyles, labelStyles, inputGroupStyles, maskFormatChars }
}

export default useStyles
