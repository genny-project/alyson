import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Navigation from 'app/layouts/navigation'
import Display from 'app/layouts/display'

const App = () => {
  const theme = createMuiTheme()

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Display />
    </ThemeProvider>
  )
}

export default App
