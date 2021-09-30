import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { useColorModeValue, VStack, Text } from '@chakra-ui/react'
import getColumns from 'app/SBE/utils/get-columns'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Card from './Card'
import './styles.css'

const LeftTable = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))
  const rows = useSelector(selectRows(parentCode))

  const backgroundColor = useColorModeValue('gray.500', '')

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <VStack bg={backgroundColor} maxW="30vw" h="inherit" alignItems="left" shadow="2xl">
      <Text textStyle="head.2" color="white" textAlign="center" mt="4">{`Internships`}</Text>
      <VStack overflowY="scroll" className="scrollBar">
        {rows.map(code => (
          <Card
            key={code}
            code={code}
            parentCode={parentCode}
            actions={actions}
            columns={columns}
            borderRadius="sm"
          />
        ))}
      </VStack>
    </VStack>
  )
}

export default LeftTable
