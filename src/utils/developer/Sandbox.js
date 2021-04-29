import { Center } from '@chakra-ui/react'
import Button from '../../app/layouts/components/button'
import Card from '../../app/layouts/components/card'
import ThemeToggler from '../../app/layouts/navigation/ColorToggler'

const Sandbox = () => {
  return (
    <Center m={2}>
      <ThemeToggler></ThemeToggler>
      <Card m={2} w={20} h={20} variant="card0"></Card>
      <Card m={2} w={20} h={20} variant="card1"></Card>
      <Card m={2} w={20} h={20} variant="card2"></Card>
      <Card m={2} w={20} h={20} variant="card3"></Card>
      <Button m={2} variant="special">
        Special
      </Button>
      <Button m={2} variant="primary">
        Primary
      </Button>
      <Button m={2} variant="secondary">
        Secondary
      </Button>
      <Button m={2} variant="positive">
        Positive
      </Button>
      <Button m={2} variant="negative">
        Negative
      </Button>
    </Center>
  )
}

export default Sandbox
