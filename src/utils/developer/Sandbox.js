import { Center } from '@chakra-ui/react'
import Button from '../../app/layouts/components/button'

const Sandbox = () => {
  return (
    <Center mt={150}>
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
