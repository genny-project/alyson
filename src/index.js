import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import reportWebVitals from './reportWebVitals'
import getApiConfig from 'config/get-api-config'
import Vertx from 'vertx'
import { Provider } from 'react-redux'
import store from 'redux/store'
import CssBaseline from '@material-ui/core/CssBaseline'

const initialiseApp = async () => {
  try {
    let apiConfig = await getApiConfig()

    const keycloak = new Keycloak({
      realm: apiConfig.realm,
      url: apiConfig.ENV_KEYCLOAK_REDIRECTURI,
      clientId: 'alyson',
    })

    document.title = apiConfig.PRI_NAME || ''
    document.querySelector("link[rel*='icon']").href = apiConfig.PRI_FAVICON

    ReactDOM.render(
      <React.StrictMode>
        <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
          <Provider store={store}>
            <CssBaseline />
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
        <Provider store={store}>
          <CssBaseline />
          <div>OFFLINE-OFFLINE-OFFLINE-OFFLINE-OFFLINE-OFFLINE</div>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root'),
    )
  }
}

initialiseApp()
reportWebVitals()
