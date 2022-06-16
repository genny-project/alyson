import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, VStack } from '@chakra-ui/react'
import getActions from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'

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
