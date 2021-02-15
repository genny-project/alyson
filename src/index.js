import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import { ReactKeycloakProvider } from '@react-keycloak/web'
// import reportWebVitals from './reportWebVitals'
import getApiConfig from 'config/get-api-config'
import Vertx from 'vertx'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { CSSReset, Center, Heading, VStack, CircularProgress } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { initLog } from 'utils/log'

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
          <Provider store={store}>
            <CSSReset />
            <Vertx />
            <App />
          </Provider>
        </ReactKeycloakProvider>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  } catch (err) {
    ReactDOM.render(
      <React.StrictMode>
        <Center h="90vh">
          <VStack spacing="15">
            <FontAwesomeIcon size="4x" icon={faExclamationCircle} color="red" />
            <Heading>Sorry our server is not responding, try again later!</Heading>
          </VStack>
        </Center>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  }
}

initialiseApp()
// reportWebVitals()
