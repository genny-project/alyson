import { useTheme } from '@chakra-ui/react'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import useProductColors from 'utils/productColors'

const useStyles = (hasValidData, isFocused) => {
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
    justifyContent: 'space-between',
    pointerEvents: 'none',
    transition: 'all 0.25s ease',
  }

  return { inputStyles, labelStyles }
}

export default useStyles
