import { extendTheme } from '@chakra-ui/react'
import { isDev } from 'utils/developer'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

//TODO: if isDev then initialColorMode: 'dark' lol

const theme = extendTheme({ config })
export default theme
