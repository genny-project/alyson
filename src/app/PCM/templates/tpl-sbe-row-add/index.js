import { Box, HStack } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'

import AddRowButton from './add-row-button'

const TemplateSBERowAdd = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3 } = mappedPcm

  const locColumn = 0
  const locOperator = 1
  const locValue = 2

  const answerCallback = loc => (askData, value) => {
    console.log(askData)
    console.log(value)
  }
  const fieldConfig = loc => {
    return { parentCode: 'VBE_ADD_ROW', answerCallback: answerCallback(loc) }
  }

  return (
    <Box>
      <HStack>
        <PcmField
          code={PRI_LOC1}
          mappedPcm={mappedPcm}
          config={fieldConfig(locColumn)}
          depth={depth}
        />
        <PcmField
          code={PRI_LOC2}
          mappedPcm={mappedPcm}
          config={fieldConfig(locOperator)}
          depth={depth}
        />
        <PcmField
          code={PRI_LOC3}
          mappedPcm={mappedPcm}
          config={fieldConfig(locValue)}
          depth={depth}
        />
        <AddRowButton mappedPcm={mappedPcm} />
      </HStack>
    </Box>
  )
}

export default TemplateSBERowAdd
