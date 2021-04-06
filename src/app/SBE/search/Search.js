import { useRef, useState } from 'react'
import {
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  IconButton,
  InputLeftElement,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import { onSendSearch } from 'vertx'

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
      <InputGroup w="xs">
        <InputLeftElement>
          <FontAwesomeIcon icon={faSearch} />
        </InputLeftElement>
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
          <IconButton icon={<FontAwesomeIcon icon={faPlus} />} />
        </InputRightAddon>
      </InputGroup>
      <Button
        color="GrayText"
        ref={clearRef}
        leftIcon={<FontAwesomeIcon icon={faTimes} />}
        onClick={handleClear}
      >
        Clear
      </Button>
    </HStack>
  )
}
export default ProcessSearch
