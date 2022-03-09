import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { compose, isEmpty, not } from 'ramda'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSendSearch } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useHotkeys } from 'react-hotkeys-hook'
import { useSelector } from 'react-redux'

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
            // defaultValue={search?.value || ''}
            ref={inputRef}
            value={searchValue}
            onChange={e => setSearchValue(e.currentTarget.value)}
            paddingBlock={3}
            paddingInline={8}
            fontWeight={'medium'}
            borderColor={'gray.700'}
            _hover={{
              borderColor: 'green.500',
              boxShadow: 'lg',
            }}
            _focusVisible={{
              borderColor: 'green.500',
              boxShadow: 'initial',
            }}
            _invalid={{
              background: 'error.50',
              borderColor: 'error.500',
              color: 'error.500',
            }}
            _disabled={{
              borderColor: 'gray.300',
              background: 'gray.100',
            }}
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
        background={'primary.900'}
        _hover={{
          background: 'primary.500',
        }}
      >
        {`Search`}
      </Button>
      {compose(not, isEmpty)(searchValue) && search && (
        <Button
          onClick={handleClear}
          leftIcon={<FontAwesomeIcon icon={faTimes} />}
          colorScheme="secondary"
          test-id={`clear-search`}
        >
          {`Clear Search`}
        </Button>
      )}
    </Stack>
  )
}
export default ProcessSearch
