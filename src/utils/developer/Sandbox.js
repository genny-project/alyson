import { Center } from '@chakra-ui/react'
import Button from '../../app/layouts/components/button'
import ThemeToggler from '../../app/layouts/navigation/ColorToggler'

const Sandbox = () => {
  return (
    <Center m={2}>
      <ThemeToggler></ThemeToggler>
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
