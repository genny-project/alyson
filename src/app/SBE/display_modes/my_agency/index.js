import { Text, VStack } from '@chakra-ui/react'

import Action from 'app/BE/action'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const MyAgency = ({ rows, sbeCode }) => {
  const agency = rows[0]

  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe)

  const agencyName = useSelector(selectCode(agency, 'PRI_NAME'))

  return (
    <VStack>
      <Text textStyle="body.1">{agencyName?.value}</Text>
      {actions?.map(action => (
        <Action key={action} parentCode={sbeCode} code={action} targetCode={agency} />
      ))}
    </VStack>
  )
}

export default MyAgency
