import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Heading, VStack } from '@chakra-ui/react'
import { getTableActions } from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'

const MyAgency = ({ rows, sbeCode }) => {
  const agency = rows[0]

  const sbe = useSelector(selectCode(sbeCode))
  const tableActions = getTableActions(sbe)

  const agencyName = useSelector(selectCode(agency, 'PRI_NAME'))

  return (
    <VStack>
      <Heading>{agencyName?.value}</Heading>
      {tableActions?.map(action => (
        <Action key={action} parentCode={sbeCode} code={action} />
      ))}
    </VStack>
  )
}

export default MyAgency
