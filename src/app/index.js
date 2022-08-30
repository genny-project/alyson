import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import { CSSReset } from '@chakra-ui/react'
import GitVersionInfo from 'utils/helpers/git_version'
import { Provider } from 'react-redux'
import Vertx from 'vertx'
import store from 'redux/store'

const Display = lazy(() => import('app/layouts/display'))

const App = ({ title }) => {
  return (
    <Provider store={store}>
      <CSSReset />
      <Vertx />
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Redirect to={{ pathname: '/home' }} />} />
          <Route
            path="/home"
            component={() => (
              <Suspense fallback={<div />}>
                <Display title={title} />
              </Suspense>
            )}
          />
          <Route path="/version" component={() => <GitVersionInfo />} />
          <Route path={`/public`} exact component={() => <Redirect to={{ pathname: '/home' }} />} />
          <Route path={'/*'} component={() => <Redirect to={{ pathname: '/home' }} />} />
        </Switch>
      </Router>
    </Provider>
  )
}
export default App
