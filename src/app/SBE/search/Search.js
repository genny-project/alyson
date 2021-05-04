import { useRef, useState, useEffect } from 'react'
import {
  HStack,
  Input,
  InputGroup,
  Button,
  InputLeftElement,
  VStack,
  Text,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import { onSendSearch } from 'vertx'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const ProcessSearch = ({ sbeCode }) => {
  const [searchValue, setSearchValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [timer, setTimer] = useState(null)
  const inputRef = useRef(null)
  const clearRef = useRef(null)

  const search = useSelector(selectCode(sbeCode, 'SCH_WILDCARD'))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))

  useEffect(() => {
    if (search?.value) setTimer(cur => new Date() - cur)
  }, [search?.value])

  const handleSubmit = () => {
    setTimer(new Date())
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
    <VStack align="start">
      <HStack spacing="5">
        <InputGroup w="xs">
          <InputLeftElement>
            <FontAwesomeIcon color="lightgrey" icon={faSearch} />
          </InputLeftElement>
          <Input
            defaultValue={search?.value || ''}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false)
              handleSubmit()
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
        <Button leftIcon={<FontAwesomeIcon icon={faSearch} />} colorScheme="primary">
          Search
        </Button>
      </HStack>
      <Text
        visibility={search?.value && typeof timer === 'number' ? 'visible' : 'hidden'}
        textStyle="tail.3"
      >{`Found ${total?.value}`}</Text>
    </VStack>
  )
}
export default ProcessSearch
