import { Center, Grid, HStack, Text, VStack, WrapItem } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import Search from 'app/SBE/search/Search'
import { selectCode, selectRows } from 'redux/db/selectors'
import InternshipCard from './InternshipCard'
import Filters from 'app/SBE/filters'
import { useColorModeValue } from '@chakra-ui/color-mode'

const InternInternshipSearch = ({ sbeCode }) => {
  const rows = useSelector(selectRows(sbeCode))
  const userCode = useSelector(selectCode('USER'))
  const userName = useSelector(selectCode(userCode, 'PRI_FIRSTNAME'))

  const bgColor = useColorModeValue('white', '')

  return (
    <VStack>
      <Center>
        <VStack shadow="md" bg={bgColor} p="5" m="5" borderRadius="md">
          <Text py="5" fontSize="2xl" fontWeight="medium">
            {`Hey ${
              userName?.value || 'there'
            }, please feel free to search for your ideal internship below`}
          </Text>
          <HStack align="start">
            <Search sbeCode={sbeCode} />
            <Filters sbeCode={sbeCode} />
          </HStack>
        </VStack>
      </Center>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {rows.map(code => (
          <WrapItem key={code}>
            <InternshipCard code={code} parentCode={sbeCode} />
          </WrapItem>
        ))}
      </Grid>
    </VStack>
  )
}

export default InternInternshipSearch
