import { useSelector } from 'react-redux'

import { selectRows, selectCode } from 'redux/db/selectors'
import getColumns from 'app/SBE/utils/get-columns'
import { Box, Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import { getAttribute } from 'app/SBE/utils/get-columns'

const LinkedHostCpy = ({ sbeCode }) => {
  const table = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  const supervisor = rows[0]

  if (!table) return null

  const columns = getColumns(table)

  return (
    <Box>
      <VStack align="start">
        <Text textStyle="body.1">Host Company</Text>
        {columns.map(col => (
          <Attribute
            key={col}
            attribute={getAttribute(col)}
            code={supervisor}
            parentCode={sbeCode}
          />
        ))}
      </VStack>
    </Box>
  )
}

export default LinkedHostCpy
