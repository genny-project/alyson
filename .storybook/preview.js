import { Provider } from 'react-redux'
import { defaultProjectTheme } from 'config/theme'
import store from 'redux/store'

const theme = defaultProjectTheme

export const decorators = [
  Story => (
    <Provider store={store}>
      <Story />
    </Provider>
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
