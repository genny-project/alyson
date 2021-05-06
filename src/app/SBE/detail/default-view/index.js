import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, HStack, VStack } from '@chakra-ui/react'

import Header from './templates/header'
import getActions from 'app/SBE/utils/get-actions'
import getColumns, { getAttribute } from 'app/SBE/utils/get-columns'
import Label from 'app/BE/attribute/Label'
import Attribute from 'app/BE/attribute'

const DefaultView = ({ sbeCode, targetCode }) => {
  const sbe = useSelector(selectCode(sbeCode))

  const rows = useSelector(selectRows(sbeCode))

  if (!sbe) return null

  const columns = getColumns(sbe)

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const actions = getActions(sbe)

  if (!beCode) return null

  const imageAttribute = 'PRI_IMAGE_URL'

  const headerAttribute = 'PRI_NAME'

  return (
    <Box minH="100vh">
      <Header
        code={beCode}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
        actions={actions}
      />
      <VStack align="start" p="5" maxH="80vh">
        {columns.map(col => (
          <HStack key={col}>
            <Box w="15rem">
              <Label code={beCode} attribute={getAttribute(col)} />
            </Box>
            <Attribute code={beCode} attribute={getAttribute(col)} />
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

export default DefaultView
