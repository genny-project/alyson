import Navigation from 'app/layouts/navigation'
import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { CSSReset } from '@chakra-ui/react'
import Vertx from 'vertx'
import { isDev } from 'utils/developer'

const DeveloperConsole = lazy(() => import('utils/developer'))
const Display = lazy(() => import('app/layouts/display'))
const Sandbox = lazy(() => import('utils/developer/Sandbox'))

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const App = () => {
  const { keycloak } = useKeycloak()
  const theme = extendTheme({ config })

  return (
    <Provider store={store}>
      <CSSReset />
      <Vertx />
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              component={() =>
                keycloak.authenticated ? (
                  <Redirect to={{ pathname: '/home' }} />
                ) : (
                  <Redirect to={{ pathname: '/public' }} />
                )
              }
            />
            <Route
              path="/home"
              component={() => (
                <>
                  <Navigation />
                  <Suspense fallback={<div />}>
                    <Display />
                  </Suspense>
                </>
              )}
            />
            <Route
              path={`/public`}
              exact
              component={() => (
                <Suspense fallback={<div />}>
                  <Display isPublic />
                </Suspense>
              )}
            />
            <Route
              path={`/redux`}
              exact
              component={() =>
                isDev ? (
                  <Suspense fallback={<div />}>
                    <DeveloperConsole />
                  </Suspense>
                ) : (
                  <Redirect to={{ pathname: '/home' }} />
                )
              }
            />
            <Route
              path={`/sandbox`}
              exact
              component={() =>
                isDev ? (
                  <Suspense fallback={<div />}>
                    <Sandbox />
                  </Suspense>
                ) : (
                  <Redirect to={{ pathname: '/home' }} />
                )
              }
            />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  )
}

export default App
