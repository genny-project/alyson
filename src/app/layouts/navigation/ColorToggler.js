import { useColorMode, IconButton, useToast } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()

  useEffect(() => {
    if (colorMode === 'dark')
      toast({
        title: 'Dark mode is in BETA, thanks for trying it out 😎',
      })
  }, [colorMode, toast])
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
