import { Box, HStack } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'

const TemplateSBESelect = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

  return (
    <Box>
      <HStack>
        <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} />
        <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} />
        <PcmField code={PRI_LOC3} mappedPcm={mappedPcm} />
        <PcmField code={PRI_LOC4} mappedPcm={mappedPcm} />
      </HStack>
    </Box>
  )
}

export default TemplateSBESelect
