import { VStack, Text } from '@chakra-ui/react'

const ErrorDisplay = ({
  errorStatus,
  hasErrorMessage,
  errorMessage,
  hasFieldMessage,
  fieldMessage,
}) => {
  return (
    <VStack alignItems="start">
      {(hasFieldMessage || (errorStatus && hasErrorMessage)) && (
        <Text textStyle="product.errorText">{hasFieldMessage ? fieldMessage : errorMessage}</Text>
      )}
    </VStack>
  )
}

export default ErrorDisplay
