import { Center, Text, VStack } from '@chakra-ui/layout'
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Center h="100vh">
          <VStack>
            <Text>{`Sorry, something went wrong, our team has been notified and will chek on the issue!`}</Text>
            <Text>{`Thank you for your patience.`}</Text>
          </VStack>
        </Center>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
