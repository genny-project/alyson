import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import reportWebVitals from './reportWebVitals'
import getApiConfig from 'config/get-api-config'
import Vertx from 'vertx'
import { Provider } from 'react-redux'
import store from 'redux/store'
import CssBaseline from '@material-ui/core/CssBaseline'

const initialiseApp = async () => {
  try {
    const { keycloak } = await getApiConfig()

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
