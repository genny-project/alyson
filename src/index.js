import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import App from 'app'
import Error from 'error'
import ErrorContextProvider from 'utils/contexts/ErrorContext'
import { Fonts } from 'config/fonts'
import IsFieldNotEmptyProvider from 'utils/contexts/IsFieldNotEmptyContext'
import Loading from 'keycloak/loading'
import LogRocket from 'logrocket'
import React from 'react'
import ReactDOM from 'react-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import getApiConfig from 'config/get-api-config'
import { initLog } from 'utils/log'

LogRocket.init('geop13/internmatch')

const initialiseApp = async () => {
  try {
    initLog()
    const { keycloak, theme, title } = await getApiConfig()

    ReactDOM.render(
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <Fonts />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ReactKeycloakProvider authClient={keycloak} LoadingComponent={<Loading />}>
            <ErrorContextProvider>
              <IsFieldNotEmptyProvider>
                <App title={title} />
              </IsFieldNotEmptyProvider>
            </ErrorContextProvider>
          </ReactKeycloakProvider>
        </ChakraProvider>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  } catch (err) {
    console.error(err)
    ReactDOM.render(
      <React.StrictMode>
        <Error />
      </React.StrictMode>,
      document.getElementById('root'),
    )
  }
}

initialiseApp()
// reportWebVitals()
