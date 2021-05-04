import { Center, VStack, Text } from '@chakra-ui/react'
import Chip from '../../app/layouts/components/chip'
import ThemeToggler from '../../app/layouts/navigation/ColorToggler'

const Sandbox = () => {
  return (
    <Center m={8}>
      <VStack spacing={8}>
        <Text textStyle="head.1">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        <Text textStyle="head.2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        <Text textStyle="head.3">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>

        <Text textStyle="head.error">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
      </VStack>
    </Center>
  )
}

export default Sandbox
