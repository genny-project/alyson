import { useSelector } from 'react-redux'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import getActions from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'

const internshipData = [
  'PRI_BASE_LEARNING_OUTCOMES',
  'PRI_DAYS_PER_WEEK',
  'PRI_SPECIFIC_LEARNING_OUTCOMES',
]
const MyInternship = ({ rows, sbeCode }) => {
  const internship = rows[0]

  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe)

  const internshipName = useSelector(selectCode(internship, 'PRI_TITLE'))
  const description = useSelector(selectCode(internship, 'PRI_DESCRIPTION'))
  const [startDate, endDate] = useSelector(
    selectAttributes(internship, ['PRI_START_DATE', 'PRI_END_DATE']),
  )

  if (!rows.length) return <Heading>No Internship Yet!</Heading>
  return (
    <VStack>
      <Heading>{internshipName?.value}</Heading>
      <Text>{`${startDate?.value || 'No Start Date'} - ${endDate?.value || 'No End Date'}`}</Text>
      <HStack>
        {actions?.map(action => (
          <Action key={action} parentCode={sbeCode} code={action} targetCode={internship} />
        ))}
      </HStack>

      <HStack>
        {internshipData.map(attribute => (
          <Attribute mini code={internship} attribute={attribute} parentCode={sbeCode} />
        ))}
      </HStack>

      <Text>{description?.value}</Text>
    </VStack>
  )
}

export default MyInternship
