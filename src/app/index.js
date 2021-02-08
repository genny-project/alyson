import Navigation from 'app/layouts/navigation'
import Display from 'app/layouts/display'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}
const App = () => {
  const theme = extendTheme({ config })

  console.log(navigator.platform)

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Navigation />
      <Display />
    </ChakraProvider>
  )
}

export default App
