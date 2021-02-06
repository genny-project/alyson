import { useRef } from 'react'
import { useColorMode, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const buttonRef = useRef(null)

  useHotkeys('cmd+i', () => buttonRef?.current.click())

  return (
    <IconButton
      ref={buttonRef}
      onClick={toggleColorMode}
      variant="ghost"
      icon={<FontAwesomeIcon icon={colorMode === 'dark' ? faMoon : faSun} />}
    />
  )
}

export default ThemeToggler
