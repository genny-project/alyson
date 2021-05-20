import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, HStack, VStack } from '@chakra-ui/react'

import getColumns, { getAttribute } from 'app/SBE/utils/get-columns'
import Label from 'app/BE/attribute/Label'
import Attribute from 'app/BE/attribute'
import DetailHeader from '../layout/Header'
import Card from 'app/layouts/components/card'

const DefaultView = ({ sbeCode, targetCode }) => {
  const sbe = useSelector(selectCode(sbeCode))

  const rows = useSelector(selectRows(sbeCode))

  if (!sbe) return null

  const columns = getColumns(sbe)

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  if (!beCode) return null

  return (
    <Box minH="100vh">
      <DetailHeader sbeCode={sbeCode} beCode={beCode} mini />
      <Card variant="card0" mt="8rem" mx="5" h="70vh" overflowY="scroll">
        <VStack h="full" align="start" p="5">
          {columns.map(col => (
            <HStack key={col}>
              <Box w="15rem">
                <Label code={beCode} attribute={getAttribute(col)} />
              </Box>
              <Attribute mini code={beCode} attribute={getAttribute(col)} />
            </HStack>
          ))}
        </VStack>
      </Card>
    </Box>
  )
}

export default DefaultView
