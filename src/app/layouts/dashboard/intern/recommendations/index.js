import { HStack, Text, VStack } from '@chakra-ui/layout'
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
    <Card variant="lg">
      <VStack>
        <Text textStyle="body2">
          Congratulations, below are some internships that we have recommended for you
        </Text>
        <HStack>
          {matchCodes.map(code => (
            <InternshipCard key={code} code={code} parentCode={'PRI_MATCHED_INTERNSHIPS'} />
          ))}
        </HStack>
      </VStack>
    </Card>
  )
}

export default Recommendations
