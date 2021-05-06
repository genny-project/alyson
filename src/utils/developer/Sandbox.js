import { VStack, Text } from '@chakra-ui/react'
import ThemeToggler from '../../app/layouts/navigation/ColorToggler'

const Sandbox = () => {
  return (
    <VStack m={8} spacing={8}>
      <ThemeToggler></ThemeToggler>{' '}
      <Text textStyle="head.1">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="head.2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="head.3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="head.success">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="head.error">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="body.1">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="body.2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="body.3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="body.success">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="body.error">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="tail.1">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="tail.2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="tail.3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="tail.success">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
      <Text textStyle="tail.error">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
    </VStack>
  )
}

export default Sandbox
