import { find, includes, keys, prop, split, head, compose } from 'ramda'
import { Image } from '@chakra-ui/image'
import { Box, Heading, HStack, VStack } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import Map from './public_search/Map'
import Search from './public_search/PublicSearch'
import Filters from 'app/SBE/filters'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import Cards from './public_search/Cards'

const Public = () => {
  const table = useSelector(
    compose(head, a => split('@', a || ''), find(includes('SBE_INTERNSHIPS_')), keys, prop('db')),
  )

  return (
    <Box pt="5">
      <VStack
        position="fixed"
        borderRadius="3xl"
        ml="25vw"
        mr="25vw"
        bg="rgba(0, 51, 102,0.3)"
        p="5"
        spacing="5"
      >
        <Image src="logo512.png" htmlWidth="512px" />
        <Heading color="blackAlpha.800">The worlds number 1 internship platform</Heading>
        <Search sbeCode={table} />
        <Filters sbeCode={table} />
        <HStack>
          <Input bg="white" borderRadius="lg" placeholder="Email" />
          <Button variant="solid" colorScheme="teal">
            Sign up
          </Button>
        </HStack>
      </VStack>
      <Cards parentCode={table} />
      <Map parentCode={table} />
    </Box>
  )
}

export default Public
