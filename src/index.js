import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
// import reportWebVitals from './reportWebVitals'
import getApiConfig from 'config/get-api-config'
import { initLog } from 'utils/log'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { Center, CircularProgress } from '@chakra-ui/react'
import App from 'app'
const Error = lazy(() => import('error'))

const initialiseApp = async () => {
  try {
    initLog()
    const { keycloak } = await getApiConfig()

    ReactDOM.render(
      <React.StrictMode>
        <ReactKeycloakProvider
          authClient={keycloak}
          LoadingComponent={
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          }
        >
          <App />
        </ReactKeycloakProvider>
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
