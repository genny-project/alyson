import { Button, HStack, Text, Kbd, Spacer } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
  return (
    <Button
      color="gray.400"
      variant="outline"
      leftIcon={<FontAwesomeIcon icon={faSearch} />}
      role="search"
    >
      <HStack display="flex">
        <Text flex="1">Search</Text>
        <Spacer />
        <HStack spacing="1">
          <Kbd color="gray.500">⌘</Kbd>
          <Kbd color="gray.500">K</Kbd>
        </HStack>
      </HStack>
    </Button>
  )
}

export default Search
