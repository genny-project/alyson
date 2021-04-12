import { useState } from 'react'
import { Button, HStack, Input, InputGroup, InputRightAddon, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { onSendSearch } from 'vertx'

const Search = () => {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSendSearch({ searchValue: value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input value={value} onChange={e => setValue(e.target.value)} />

        <Button
          w="10rem"
          colorScheme="primary"
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
          role="search"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </HStack>
    </form>
  )
}

export default Search
