import { Box, VStack } from '@chakra-ui/react'
import { find, includes, reduce } from 'ramda'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import React from 'react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TemplateOne = ({ mappedPcm }) => {
  const { PRI_LOC1, PRI_LOC2 } = mappedPcm

  return (
    <Box>
      <Card position="sticky" top="5vh">
        <VStack alignItems={'start'} spacing={7} paddingRight={10}>
          <Attribute
            config={{ textStyle: 'head.1' }}
            code="LAB_REJECT_MENTEE"
            attribute={PRI_LOC1}
          />
          <Attribute
            config={{ textStyle: 'head.2' }}
            code="LAB_REJECT_MENTEE"
            attribute={PRI_LOC2}
          />
        </VStack>
      </Card>
    </Box>
  )
}

const DashboardMessages = () => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`))
  const messagesPcmCode = find(includes('_LABEL'))(allPcmCode)
  const messagesPcm = useSelector(selectCode(messagesPcmCode, 'allAttributes'))

  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(messagesPcm || [])

  const { PRI_TEMPLATE_CODE: code } = mappedPcm

  if (code === 'TPL_LABEL') {
    return <TemplateOne mappedPcm={mappedPcm} />
  }
}

export default DashboardMessages