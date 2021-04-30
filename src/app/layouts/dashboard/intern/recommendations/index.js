import { Stack, Text, VStack } from '@chakra-ui/layout'
import Card from 'app/layouts/components/card'
import InternshipCard from 'app/layouts/table/intern_internship/InternshipCard'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const Recommendations = () => {
  const userCode = useSelector(selectCode('USER'))
  const matchString = useSelector(selectCode(userCode, 'PRI_MATCHED_INTERNSHIPS'))
  const matchCodes = safelyParseJson(matchString?.value, [])

  if (!matchCodes.length) return null

  return (
    <Card maxW="90vw">
      <VStack>
        <Text align="center" textStyle="head2">
          Congratulations, below are some recommended internships!
        </Text>
        <Stack direction={['column', 'row']}>
          {matchCodes.map(code => (
            <InternshipCard key={code} code={code} parentCode={'PRI_MATCHED_INTERNSHIPS'} />
          ))}
        </Stack>
      </VStack>
    </Card>
  )
}

export default Recommendations
