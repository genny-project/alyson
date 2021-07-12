import { useRef, useState } from 'react'
import {
  Stack,
  Input,
  InputGroup,
  Button,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import { onSendSearch } from 'vertx'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const ProcessSearch = ({ sbeCode, process, placeholder }) => {
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
    <Stack direction="row">
      <form onSubmit={handleSubmit}>
        <InputGroup w="xs" maxW="50vw">
          <InputLeftElement>
            <FontAwesomeIcon color="lightgrey" icon={faSearch} />
          </InputLeftElement>
          <Input
            placeholder={placeholder}
            test-id={`SEARCH-ALL-ATTRIBUTES`}
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
              test-id={`process-view-clear-search`}
            />
          </InputRightElement>
        </InputGroup>
      </form>

      <Button
        onClick={handleSubmit}
        leftIcon={<FontAwesomeIcon icon={faSearch} />}
        colorScheme="primary"
        test-id={`process-view-search`}
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
  )
}
export default ProcessSearch
