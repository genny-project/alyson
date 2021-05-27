import { useRef, useState, useEffect } from 'react'
import {
  HStack,
  Input,
  InputGroup,
  Button,
  InputLeftElement,
  VStack,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import { onSendSearch } from 'vertx'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const ProcessSearch = ({ sbeCode, process }) => {
  const [searchValue, setSearchValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const clearRef = useRef(null)

  const search = useSelector(selectCode(process || sbeCode, 'SCH_WILDCARD'))

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

  useHotkeys('enter', () => focused && handleSubmit(), {
    enableOnTags: ['INPUT'],
  })

  return (
    <VStack align="start" pb="5">
      <HStack>
        <InputGroup w="xs">
          <InputLeftElement>
            <FontAwesomeIcon color="lightgrey" icon={faSearch} />
          </InputLeftElement>
          <Input
            defaultValue={search?.value || ''}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false)
            }}
            ref={inputRef}
            value={searchValue}
            onChange={e => setSearchValue(e.currentTarget.value)}
          />
          <InputRightElement>
            <IconButton
              variant="ghost"
              colorScheme="primary"
              ref={clearRef}
              icon={<FontAwesomeIcon color="lightgrey" icon={faTimes} />}
              onClick={handleClear}
            />
          </InputRightElement>
        </InputGroup>
        <Button
          onClick={handleSubmit}
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
          colorScheme="primary"
        >
          Search
        </Button>
        {search && (
          <Button
            onClick={handleClear}
            leftIcon={<FontAwesomeIcon icon={faTimes} />}
            colorScheme="secondary"
          >
            Clear Search
          </Button>
        )}
      </HStack>
    </VStack>
  )
}
export default ProcessSearch
