import Navigation from 'app/layouts/navigation'
import Display from 'app/layouts/display'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const App = () => {
  const theme = extendTheme()

  return (
    <ChakraProvider theme={theme}>
      <Navigation />
      <Display />
    </ChakraProvider>
  )
}

export default App
