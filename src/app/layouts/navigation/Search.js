import { useState } from 'react'
import { Button, Input, VStack } from '@chakra-ui/react'
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
      <VStack>
        <Input value={value} onChange={e => setValue(e.target.value)} />

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
