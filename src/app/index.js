import Navigation from 'app/layouts/navigation'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { CSSReset, Center, CircularProgress } from '@chakra-ui/react'
import { ReactKeycloakProvider } from '@react-keycloak/web'

const Vertx = lazy(() => import('vertx'))
const Display = lazy(() => import('app/layouts/display'))

const config = {
  initialColorMode: 'light',
}
const App = ({ keycloak }) => {
  const theme = extendTheme({ config })

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      LoadingComponent={
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      }
    >
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
    </ReactKeycloakProvider>
  )
}

export default App
