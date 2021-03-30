import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { CSSReset } from '@chakra-ui/react'
import Vertx from 'vertx'
import { isDev } from 'utils/developer'

const DeveloperConsole = lazy(() => import('utils/developer'))
const Display = lazy(() => import('app/layouts/display'))
const Sandbox = lazy(() => import('utils/developer/Sandbox'))

const App = () => {
  const { keycloak } = useKeycloak()

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
                <Display />
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
          {isDev ? (
            <Suspense fallback={<div />}>
              <DeveloperConsole />
            </Suspense>
          ) : null}
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
