import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, VStack, HStack } from '@chakra-ui/react'
import { getTableActions } from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'

const OurInterns = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const tableActions = getTableActions(sbe)

  return (
    <VStack>
      <Text textStyle="body.2"> {total?.value} Interns</Text>
      <HStack>
        {tableActions?.map(action => (
          <Action key={action} parentCode={sbeCode} code={action} />
        ))}
      </HStack>
    </VStack>
  )
}

export default OurInterns
