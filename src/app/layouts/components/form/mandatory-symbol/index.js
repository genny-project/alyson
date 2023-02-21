import { Text } from '@chakra-ui/react'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'

const MandatorySymbol = ({ placeholderName, mandatory, labelTextColor, realm }) => {
  const isProductInternMatch = useIsProductInternmatch()
  return (
    placeholderName && (
      <Text
        as="label"
        fontSize={'sm'}
        fontWeight={'normal'}
        color={isProductInternMatch ? `${realm}.primary` : labelTextColor}
        textStyle={!!isProductInternMatch && `${realm}.labelStyles`}
      >
        {placeholderName}
        {mandatory ? (
          <Text as="span" color={`${realm}.secondary`} ml={1}>
            *
          </Text>
        ) : (
          <></>
        )}
      </Text>
    )
  )
}

export default MandatorySymbol
