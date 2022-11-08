import { Box, HStack } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'

import AddRowButton from './add-row-button'

const TemplateSBERowAdd = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3 } = mappedPcm

  const locConfig = { parentCode: 'VBE_ADD_ROW' }

  return (
    <Box>
      <HStack>
        <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} config={locConfig} depth={depth} />
        <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} config={locConfig} depth={depth} />
        <PcmField code={PRI_LOC3} mappedPcm={mappedPcm} config={locConfig} depth={depth} />
        <AddRowButton mappedPcm={mappedPcm} />
      </HStack>
    </Box>
  )
}

export default TemplateSBERowAdd
