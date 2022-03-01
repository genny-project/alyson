import { Button, Input, VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { onSendSearch } from 'vertx'
import { useState } from 'react'

const Search = () => {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSendSearch({ searchValue: value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          paddingBlock={3}
          paddingInline={5}
          fontWeight={'medium'}
          borderColor={'gray.700'}
          background={'light'}
          _hover={{
            borderColor: 'primary.500',
            boxShadow: 'lg',
          }}
          _focusVisible={{
            borderColor: 'primary.500',
            boxShadow: 'initial',
          }}
          _invalid={{
            borderColor: 'error.500',
            background: 'error.50',
            color: 'error.500',
          }}
          _disabled={{
            borderColor: 'gray.300',
            background: 'gray.100',
          }}
        />

        <Button
          w="15rem"
          colorScheme="primary"
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
          role="search"
          onClick={handleSubmit}
        >
          Search all of Internmatch
        </Button>
      </VStack>
    </form>
  )
}

export default Search
