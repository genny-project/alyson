import { Text, VStack } from '@chakra-ui/react'

const ErrorDisplay = ({
  errorStatus,
  hasErrorMessage,
  errorMessage,
  hasFieldMessage,
  fieldMessage,
  realm,
  isProductIM,
}) => {
  return (
    <VStack alignItems="start">
      {(hasFieldMessage || (errorStatus && hasErrorMessage)) && (
        <Text textStyle="product.errorText" color={isProductIM ? `${realm}.secondary` : 'error.50'}>
          {hasFieldMessage ? fieldMessage : errorMessage}
        </Text>
      )}
    </VStack>
  )
}

export default ErrorDisplay
