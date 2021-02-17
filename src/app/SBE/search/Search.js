import { useRef, useState } from 'react'
import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Kbd,
  Center,
  Button,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import { onSendSearch } from 'vertx'
import KeyboardShortcut from 'app/layouts/components/kbd_shortcut'

const ProcessSearch = ({ sbeCode }) => {
  const [searchValue, setSearchValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const clearRef = useRef(null)

  const handleSubmit = () => {
    onSendSearch({ searchValue, sbeCode, searchType: '!' })
    inputRef.current.blur()
  }

  const handleClear = () => {
    onSendSearch({ searchType: '!', searchValue: '', sbeCode })
    setSearchValue('')
  }

  useHotkeys('ctrl+k, cmd+k', () => {
    setSearchValue('')
    inputRef?.current?.focus()
  })

  useHotkeys('ctrl+c, cmd+c', () => {
    clearRef?.current?.click()
  })

  useHotkeys('enter', () => focused && handleSubmit(), {
    enableOnTags: ['INPUT'],
  })

  return (
    <HStack spacing={1}>
      <InputGroup marginLeft="6" w="md">
        <InputLeftAddon>
          <FontAwesomeIcon icon={faSearch} />
        </InputLeftAddon>
        <Input
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            handleSubmit()
          }}
          ref={inputRef}
          value={searchValue}
          onChange={e => setSearchValue(e.currentTarget.value)}
          placeholder="Search"
        />
        <InputRightAddon cursor="pointer" onClick={handleSubmit}>
          <HStack spacing="1" color="gray.500">
            {focused ? (
              <Kbd>enter</Kbd>
            ) : (
              <>
                <KeyboardShortcut />
                <Kbd>K</Kbd>
              </>
            )}
          </HStack>
        </InputRightAddon>
      </InputGroup>
      <Button
        color="GrayText"
        ref={clearRef}
        rightIcon={
          <HStack spacing="1" color="gray.500">
            <KeyboardShortcut />
            <Kbd>C</Kbd>
          </HStack>
        }
        onClick={handleClear}
      >
        Clear Search
      </Button>
    </HStack>
  )
}
export default ProcessSearch
