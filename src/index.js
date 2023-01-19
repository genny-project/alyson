import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import App from 'app'
import Error from 'error'
import ErrorContextProvider from 'utils/contexts/ErrorContext'
import { Fonts } from 'config/fonts'
import IsFieldNotEmptyProvider from 'utils/contexts/IsFieldNotEmptyContext'
import Loading from 'keycloak/loading'
import LogRocket from 'logrocket'
import React from 'react'
// import { initLog } from 'utils/log'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import getApiConfig from 'config/get-api-config'
import { createRoot } from 'react-dom/client'

LogRocket.init('geop13/internmatch')

const onKeycloakError = error => {
  if (!!error) {
    window.location.reload()
  }
}

const initialiseApp = async () => {
  const container = document.getElementById('app')
  const root = createRoot(container)
  try {
    // initLog()
    const { keycloak, theme, title } = await getApiConfig()

    root.render(
      <ReactKeycloakProvider
        authClient={keycloak}
        LoadingComponent={<Loading />}
        onEvent={(__, error) => onKeycloakError(error)}
      >
        {/* <React.StrictMode> */}
        <ChakraProvider theme={theme}>
          <Fonts />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />

          <ErrorContextProvider>
            <IsFieldNotEmptyProvider>
              <App title={title} />
            </IsFieldNotEmptyProvider>
          </ErrorContextProvider>
        </ChakraProvider>
        {/* </React.StrictMode> */}
      </ReactKeycloakProvider>,
    )
  } catch (err) {
    console.error(err)
    root.render(
      <React.StrictMode>
        <Error />
      </React.StrictMode>,
    )
  }
}

initialiseApp()
// reportWebVitals()
