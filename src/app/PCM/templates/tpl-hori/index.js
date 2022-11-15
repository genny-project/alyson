import { Box, HStack } from '@chakra-ui/react'

import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'

/**
 * Returns all mapped attributes in a horizontal list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
const TemplateHori = ({ mappedPcm, depth }) => {
  return (
    <HStack margin={'auto'} width="min(100%, 38.75rem)">
      {mapSpillLocs(loc => (
        <Box key={loc}>
          <PcmField code={loc} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      ))(getSpillLocs(mappedPcm)())}
    </HStack>
  )
}

export default TemplateHori
