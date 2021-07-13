import { useSelector } from 'react-redux'

import { selectRows, selectCode } from 'redux/db/selectors'
import getColumns from 'app/SBE/utils/get-columns'
import { Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import { getAttribute } from 'app/SBE/utils/get-columns'
import Card from 'app/layouts/components/card'
import { useIsMobile } from 'utils/hooks'

const LinkedHostCpy = ({ sbeCode }) => {
  const table = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  const supervisor = rows[0]
  const width = useIsMobile() ? '90vw' : '33vw'

  if (!table) return null

  const columns = getColumns(table)

  return (
    <Card variant="card0" m="3" w={width}>
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
    </Card>
  )
}

export default LinkedHostCpy
