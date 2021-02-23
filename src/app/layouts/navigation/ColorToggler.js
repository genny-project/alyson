import { useColorMode, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      m="2"
      onClick={toggleColorMode}
      variant="ghost"
      icon={<FontAwesomeIcon icon={colorMode === 'dark' ? faSun : faMoon} />}
    />
  )
}

export default ThemeToggler
