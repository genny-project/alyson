import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
// import reportWebVitals from './reportWebVitals'
import getApiConfig from 'config/get-api-config'
import { initLog } from 'utils/log'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { Center, CircularProgress } from '@chakra-ui/react'
import App from 'app'
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'

const Error = lazy(() => import('error'))

const initialiseApp = async () => {
  try {
    initLog()
    const { keycloak, theme } = await getApiConfig()
    ReactDOM.render(
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
        </ChakraProvider>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  } catch (err) {
    console.error(err)
    ReactDOM.render(
      <React.StrictMode>
        <Suspense fallback={<div />}>
          <ChakraProvider>
            <Error />
          </ChakraProvider>
        </Suspense>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  }
}

initialiseApp()
// reportWebVitals()
