import { Box } from '@chakra-ui/react'
import Navigation from 'app/layouts/navigation'
import FormBuilder from './builder/FormBuilder'

const Sandbox = () => {
  return (
    <Box
      backgroundColor={'white'}
      id="main-display"
      position="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      overflow="scroll"
    >
      <Navigation />
      <Box mt="6rem">
        <FormBuilder />
      </Box>
    </Box>
  )
}

export default Sandbox
