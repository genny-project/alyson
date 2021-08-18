import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { CSSReset } from '@chakra-ui/react'

import Vertx from 'vertx'
import LinkedApp from 'app/layouts/dashboard/mentee/linked_app'
import { pathNameLinkedApplication } from 'utils/pathname'
import GitVersionInfo from 'utils/helpers/git_version'

const Display = lazy(() => import('app/layouts/display'))

const App = () => {
  return (
    <Provider store={store}>
      <CSSReset />
      <Vertx />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Redirect to={{ pathname: '/home' }} />} />
          <Route exact path={pathNameLinkedApplication} component={() => <LinkedApp />} />
          <Route
            path="/home"
            component={() => (
              <Suspense fallback={<div />}>
                <Display />
              </Suspense>
            )}
          />
          <Route path="/version" component={() => <GitVersionInfo />} />
          <Route path={`/public`} exact component={() => <Redirect to={{ pathname: '/home' }} />} />
          <Route path={'/*'} component={() => <Redirect to={{ pathname: '/home' }} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
export default App
