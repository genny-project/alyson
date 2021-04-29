import { Center, HStack } from '@chakra-ui/react'
import Chip from '../../app/layouts/components/chip'
import ThemeToggler from '../../app/layouts/navigation/ColorToggler'

const Sandbox = () => {
  return (
    <Center m={8}>
      <HStack spacing={8}>
        <ThemeToggler></ThemeToggler>
        <Chip>Default</Chip>
        <Chip variant="primary">Primary</Chip>
        <Chip variant="secondary">Secondary</Chip>
        <Chip variant="positive">Positive</Chip>
        <Chip variant="negative">Negative</Chip>
      </HStack>
    </Center>
  )
}

export default Sandbox
