import { useState } from 'react'
import { Button, Input, InputGroup, InputRightAddon, VStack } from '@chakra-ui/react'
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
    <VStack>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input value={value} onChange={e => setValue(e.target.value)} />
          <InputRightAddon w="10rem" p="0">
            <Button
              w="10rem"
              variant="unstyled"
              leftIcon={<FontAwesomeIcon icon={faSearch} />}
              role="search"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>
      </form>
    </VStack>
  )
}

export default Search
