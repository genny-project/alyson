import { Button, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import { compose, isEmpty, not } from 'ramda'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Iconly } from 'react-iconly'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { onSendSearch } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useHotkeys } from 'react-hotkeys-hook'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'
import useStyles from 'app/DTT/inputStyles'
import { isNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'

const ProcessSearchDefaultView = ({ sbeCode, process, placeholder, sourceCode, targetCode }) => {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef(null)

  const search = useSelector(selectCode(process || sbeCode, 'SCH_WILDCARD'))

  const handleSubmit = e => {
    e.preventDefault()
    onSendSearch({ searchValue, sbeCode, searchType: '!', sourceCode, targetCode })
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

  const isInvalid = isNullOrUndefinedOrEmpty(searchValue)
  const hasValidData = searchValue && !isInvalid

  const { borderRadius } = useProductColors()
  const { inputStyles } = useStyles(hasValidData, isInvalid)

  return (
    <Stack spacing="5" direction={isMobile ? 'column' : 'row'} w={isMobile ? 'full' : 'auto'}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <InputGroup w="full" maxW={isMobile ? 'inherit' : '50vw'}>
          <InputLeftElement left={1} top={1}>
            <Iconly name={'Search'} set={'light'} size={'small'} primaryColor={'#063231'} />
          </InputLeftElement>
          <Input
            placeholder={placeholder}
            test-id={`SEARCH-ALL-ATTRIBUTES`}
            // defaultValue={search?.value || ''}
            ref={inputRef}
            value={searchValue}
            onChange={e => setSearchValue(e.currentTarget.value)}
            paddingBlock={3}
            paddingStart={10}
            paddingEnd={3}
            width={'15rem'}
            fontSize={'sm'}
            fontWeight={'medium'}
            borderRadius={borderRadius}
            {...inputStyles}
          />
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
        borderRadius={borderRadius}
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
          borderRadius={borderRadius}
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

export default ProcessSearchDefaultView
