import React from 'react'
import ReactDOM from 'react-dom'
import getApiConfig from 'config/get-api-config'
import { initLog } from 'utils/log'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import App from 'app'
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import { Fonts } from 'config/fonts'
import Loading from 'keycloak/loading'
// import LogRocket from 'logrocket'
import Error from 'error'

// LogRocket.init('put your logrocket identifier to use')

const initialiseApp = async () => {
  try {
    initLog()
    const { keycloak, theme } = await getApiConfig()

    ReactDOM.render(
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <Fonts />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ReactKeycloakProvider authClient={keycloak} LoadingComponent={<Loading />}>
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
        <Error />
      </React.StrictMode>,
      document.getElementById('root'),
    )
  }
}

initialiseApp()
// reportWebVitals()
