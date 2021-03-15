import { Box, Center, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import Search from 'app/SBE/search/Search'
import { selectRows } from 'redux/db/selectors'
import InternshipCard from './InternshipCard'
import Filters from 'app/SBE/filters'

const InternInternshipSearch = ({ sbeCode }) => {
  const rows = useSelector(selectRows(sbeCode))

  return (
    <Box>
      <Center>
        <VStack>
          <Text fontSize="2xl" fontWeight="medium">
            Internships
          </Text>
          <Text>Find your career link</Text>
          <Search sbeCode={sbeCode} />
          <Filters sbeCode={sbeCode} />
        </VStack>
      </Center>
      <Wrap ml="10" mr="10">
        {rows.map(code => (
          <WrapItem key={code}>
            <InternshipCard code={code} />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  )
}

export default InternInternshipSearch
