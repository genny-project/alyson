import { useColorMode, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      mr="2"
      size="sm"
      colorScheme="primary"
      onClick={toggleColorMode}
      variant="ghost"
      icon={<FontAwesomeIcon icon={colorMode === 'dark' ? faSun : faMoon} />}
    />
  )
}

export default ThemeToggler
