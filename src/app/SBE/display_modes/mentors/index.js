import { HStack, Text, VStack } from '@chakra-ui/react'

import Action from 'app/BE/action'
import { getTableActions } from 'app/SBE/utils/get-actions'
import { mentors } from 'utils/constants'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const Mentors = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const tableActions = getTableActions(sbe)

  return (
    <VStack>
      <HStack>
        <Text textStyle="body.1">{total?.value}</Text>
        <Text mr="1" textStyle="body.2">
          {mentors}
        </Text>
      </HStack>
      <HStack>
        {tableActions?.map(action => (
          <Action key={action} parentCode={sbeCode} code={action} />
        ))}
      </HStack>
    </VStack>
  )
}

export default Mentors
