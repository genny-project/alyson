import Navigation from 'app/layouts/navigation'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { CSSReset } from '@chakra-ui/react'
import Vertx from 'vertx'
const Display = lazy(() => import('app/layouts/display'))

const config = {
  initialColorMode: 'light',
}
const App = () => {
  const theme = extendTheme({ config })

  return (
    <Provider store={store}>
      <CSSReset />
      <Vertx />
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <Navigation />
        <Suspense fallback={<div />}>
          <Display />
        </Suspense>
      </ChakraProvider>
    </Provider>
  )
}

export default App
