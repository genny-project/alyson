import { Provider } from 'react-redux'
import { defaultProjectTheme } from 'config/theme'
import store from 'redux/store'
import ErrorContextProvider from 'utils/contexts/ErrorContext'
import IsFieldNotEmptyProvider from 'utils/contexts/IsFieldNotEmptyContext'

const theme = defaultProjectTheme

export const decorators = [
  Story => (
    <ErrorContextProvider>
      <IsFieldNotEmptyProvider>
        <Provider store={store}>
          <Story />
        </Provider>
      </IsFieldNotEmptyProvider>
    </ErrorContextProvider>
  ),
]

export const parameters = {
  chakra: {
    theme,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
