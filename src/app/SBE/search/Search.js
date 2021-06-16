import { useRef, useState } from 'react'
import {
  Stack,
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
import { useIsMobile } from 'utils/hooks'

const ProcessSearch = ({ sbeCode, process }) => {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef(null)
  const clearRef = useRef(null)

  const search = useSelector(selectCode(process || sbeCode, 'SCH_WILDCARD'))

  const handleSubmit = e => {
    e.preventDefault()
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

  return (
    <VStack align="start" pb="5">
      <Stack direction={useIsMobile() ? 'column' : 'row'}>
        <form onSubmit={handleSubmit}>
          <InputGroup w="xs" maxW="50vw">
            <InputLeftElement>
              <FontAwesomeIcon color="lightgrey" icon={faSearch} />
            </InputLeftElement>
            <Input
              test-id={`${sbeCode}-SCH_WILDCARD`}
              defaultValue={search?.value || ''}
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
        </form>

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
      </Stack>
    </VStack>
  )
}
export default ProcessSearch
