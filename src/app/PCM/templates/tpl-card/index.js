import { Box } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'

const TemplateCard = mappedPcm => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <PcmField code={mappedPcm.PRI_LOC1} mappedPcm={mappedPcm} />
    </Box>
  )
}

export default TemplateCard
