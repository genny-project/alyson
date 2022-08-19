import {
  Button,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  theme,
} from '@chakra-ui/react'
import { compose, isEmpty, not } from 'ramda'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSendSearch } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useHotkeys } from 'react-hotkeys-hook'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'
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

  const isMobile = useIsMobile()
  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.value

  const { fieldBackgroundColor } = useProductColors

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      alignItems={'center'}
      w="full"
      maxW={isMobile ? 'inherit' : '50vw'}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <InputGroup w="full" maxW={isMobile ? 'inherit' : '50vw'}>
          <InputLeftElement left={3}>
            <FontAwesomeIcon color={iconColor} icon={faSearch} />
          </InputLeftElement>
          <Divider
            orientation="vertical"
            height={6}
            colorScheme={'product.secondary'}
            borderColor={'product.secondary'}
            opacity={1}
            position={'absolute'}
            left={12}
            top={2}
            zIndex={theme.zIndices.docked}
          />
          <Input
            placeholder={placeholder}
            test-id={`SEARCH-ALL-ATTRIBUTES`}
            // defaultValue={search?.value || ''}
            ref={inputRef}
            value={searchValue}
            onChange={e => setSearchValue(e.currentTarget.value)}
            paddingBlock={3}
            paddingStart={14}
            paddingEnd={12}
            bg={fieldBackgroundColor}
            borderRadius={'calc(0.25rem - 1px)'}
            borderColor={'product.gray'}
            fontSize={'sm'}
            fontWeight={'medium'}
            color="product.darkGray"
            cursor={'pointer'}
            _hover={{
              borderColor: 'product.gray',
              boxShadow: 'lg',
            }}
            _focusVisible={{
              borderColor: 'product.secondary',
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
              colorScheme="secondary"
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
        paddingBlock={2}
        paddingInline={2}
        minW={'8.25rem'}
        background={'product.secondary'}
        borderRadius={'calc(0.25rem - 1px)'}
        border={'1px solid transparent'}
        borderColor={'product.secondary'}
        fontSize={'sm'}
        fontWeight={'400'}
        _hover={{
          background: 'product.white',
          color: 'product.secondary',
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
          variant="outline"
          paddingBlock={2}
          paddingInline={2}
          minW={'8.25rem'}
          background={'product.white'}
          fontSize={'sm'}
          fontWeight={'400'}
          borderRadius={'calc(0.25rem - 1px)'}
          borderColor="product.secondary"
          _hover={{
            background: 'product.secondary',
            color: 'product.white',
          }}
        >
          {`Clear Search`}
        </Button>
      )}
    </Stack>
  )
}
export default ProcessSearch
