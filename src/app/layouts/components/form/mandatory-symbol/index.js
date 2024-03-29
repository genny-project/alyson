import { Text } from '@chakra-ui/react'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'

const MandatorySymbol = ({
  placeholderName,
  mandatory,
  labelTextColor,
  realm,
  isSubmitApplicationForm = false,
}) => {
  const isProductInternMatch = useIsProductInternmatch()
  return (
    placeholderName && (
      <Text
        as="label"
        fontSize={isSubmitApplicationForm ? 'md' : 'sm'}
        fontWeight={isSubmitApplicationForm ? '700' : 'normal'}
        color={
          isSubmitApplicationForm
            ? 'gray.800'
            : isProductInternMatch
            ? `${realm}.primary`
            : labelTextColor
        }
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
