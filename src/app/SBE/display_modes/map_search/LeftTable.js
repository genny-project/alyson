import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { useColorModeValue, VStack, Text } from '@chakra-ui/react'
import getColumns from 'app/SBE/utils/get-columns'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Card from './Card'

const LeftTable = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))
  const rows = useSelector(selectRows(parentCode))

  const backgroundColor = useColorModeValue('gray.50', '')

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <VStack bg={backgroundColor} w="30vw" alignItems="left" zIndex="overlay" shadow="2xl">
      <VStack maxH="85vh" overflowY="scroll">
        <Text textStyle="head.2">{`Internships`}</Text>
        {rows.map(code => (
          <Card
            key={code}
            code={code}
            parentCode={parentCode}
            actions={actions}
            columns={columns}
          />
        ))}
      </VStack>
    </VStack>
  )
}

export default LeftTable
