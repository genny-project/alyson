import { extendTheme } from '@chakra-ui/react'
import { isDev } from 'utils/developer'

const config = {
  initialColorMode: isDev ? 'dark' : 'light',
}

const theme = extendTheme({ config })
export default theme
