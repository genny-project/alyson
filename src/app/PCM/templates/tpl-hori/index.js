import { HStack, Box } from '@chakra-ui/react'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'

/**
 * Returns all mapped attributes in a horizontal list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
const TemplateHori = ({ mappedPcm, depth }) => {
  console.log(mappedPcm)
  return (
    <HStack alignSelf="flex-start">
      {mapSpillLocs(loc => (
        <Box width="auto" key={loc}>
          <PcmField code={loc} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      ))(getSpillLocs(mappedPcm)())}
    </HStack>
  )
}

export default TemplateHori
