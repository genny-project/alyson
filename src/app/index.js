import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { Box, CSSReset } from '@chakra-ui/react'
import Vertx from 'vertx'
import { isDev } from 'utils/developer'
import setupGoogleApi from 'config/setup-google-api'

const Navigation = lazy(() => import('app/layouts/navigation'))
const DeveloperConsole = lazy(() => import('utils/developer'))
const Display = lazy(() => import('app/layouts/display'))
const Sandbox = lazy(() => import('utils/developer/Sandbox'))

const App = () => {
  const { keycloak } = useKeycloak()
  const { token } = keycloak

  useEffect(() => {
    if (token && !window.google) setupGoogleApi({ token })
  }, [token])

  return (
    <Provider store={store}>
      <CSSReset />
      <Vertx />
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
              <Suspense fallback={<div />}>
                <Box>
                  <Navigation />
                  <Display />
                  {isDev ? (
                    <Suspense fallback={<div />}>
                      <DeveloperConsole />
                    </Suspense>
                  ) : null}
                </Box>
              </Suspense>
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
    </Provider>
  )
}

export default App
