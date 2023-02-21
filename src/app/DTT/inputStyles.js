import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import useProductColors from 'utils/productColors'

const useStyles = hasValidData => {
  const realm = useGetProductName().toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()

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
    borderRadius: isProductInternMatch ? 'lg' : borderRadius,
    borderColor: isProductInternMatch ? `${realm}.primary` : fieldBorderColor,
    borderWidth: '1px',
    borderStyle: 'solid',
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

  return { inputStyles }
}

export default useStyles
