import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { useColorModeValue, VStack } from '@chakra-ui/react'
import getColumns from 'app/SBE/utils/get-columns'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Search from 'app/SBE/search/Search'
import Title from 'app/SBE/table/Title'
import Filters from 'app/SBE/filters'
import Card from './Card'

const LeftTable = ({ parentCode }) => {
  const tableData = useSelector(selectCode(parentCode))
  const rows = useSelector(selectRows(parentCode))

  const backgroundColor = useColorModeValue('gray.50', '')

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <VStack
      bg={backgroundColor}
      position="absolute"
      top="0"
      pt="13rem"
      bottom="0"
      left="0"
      w="30vw"
      alignItems="left"
      zIndex="overlay"
      shadow="2xl"
    >
      <VStack
        align="start"
        w="30vw"
        h="10rem"
        position="absolute"
        top="4rem"
        pt="1rem"
        left="0"
        bg="white"
        pl="5"
        boxShadow="md"
      >
        <Title sbeCode={parentCode} />
        <Search sbeCode={parentCode} />
        <Filters sbeCode={parentCode} />
      </VStack>

      <VStack pt="1rem" h="80vh" overflowY="scroll">
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
