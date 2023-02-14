import { Text } from '@chakra-ui/react'

const MandatorySymbol = ({ placeholderName, mandatory, labelTextColor, realm }) => {
  return (
    placeholderName && (
      <Text as="label" fontSize={'sm'} fontWeight={'normal'} color={labelTextColor}>
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
