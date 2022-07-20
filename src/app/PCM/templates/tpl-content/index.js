import { Box } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'

/**
 * A straight passthrough template, can use this to prevent re-rendering large templates with lots of children
 */
const TemplateContent = ({ mappedPcm, ...properties }) => {
  return (
    <Box mx="100px">
      <PcmField code={mappedPcm.PRI_LOC1} mappedPcm={mappedPcm} properties={properties} />
    </Box>
  )
}

export default TemplateContent
