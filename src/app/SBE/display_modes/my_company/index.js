import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, VStack } from '@chakra-ui/react'
import getActions from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'

const MyCompany = ({ rows, sbeCode }) => {
  const agency = rows[0]

  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe)

  const agencyName = useSelector(selectCode(agency, 'PRI_NAME'))
  const description = useSelector(selectCode(agency, 'PRI_DESCRIPTION'))

  return (
    <VStack>
      <Text fontSize="2xl" fontWeight="medium">
        {agencyName?.value}
      </Text>
      {actions?.map(action => (
        <Action key={action} parentCode={sbeCode} code={action} targetCode={agency} />
      ))}
      <Text>{description?.value}</Text>
    </VStack>
  )
}

export default MyCompany
