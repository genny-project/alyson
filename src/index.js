import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
// import reportWebVitals from './reportWebVitals'
import getApiConfig from 'config/get-api-config'
import { initLog } from 'utils/log'

const App = lazy(() => import('app'))
const Error = lazy(() => import('error'))

const initialiseApp = async () => {
  try {
    initLog()
    const { keycloak } = await getApiConfig()

    ReactDOM.render(
      <React.StrictMode>
        <Suspense fallback={<div />}>
          <App keycloak={keycloak} />
        </Suspense>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  } catch (err) {
    ReactDOM.render(
      <React.StrictMode>
        <Suspense fallback={<div />}>
          <Error />
        </Suspense>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  }
}

initialiseApp()
// reportWebVitals()
