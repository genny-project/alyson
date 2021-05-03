import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { CSSReset } from '@chakra-ui/react'
import Vertx from 'vertx'
import { isDev } from 'utils/developer'

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
          <Route exact path="/" component={() => <Redirect to={{ pathname: '/home' }} />} />
          <Route
            path="/home"
            component={() => (
              <Suspense fallback={<div />}>
                <Display />
              </Suspense>
            )}
          />
          <Route path={`/public`} exact component={() => <Redirect to={{ pathname: '/home' }} />} />
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
