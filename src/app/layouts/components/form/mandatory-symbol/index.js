import { Text } from '@chakra-ui/react'

const MandatorySymbol = ({ placeholderName, mandatory, labelTextColor }) => {
  return (
    placeholderName && (
      <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
        {placeholderName}
        {mandatory ? (
          <Text as="span" color={'red.500'} ml={1}>
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
