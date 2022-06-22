import { HStack } from '@chakra-ui/react'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'

/**
 * Returns all mapped attributes in a horizontal list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
const TemplateHori = ({ mappedPcm }) => {
  return (
    <HStack alignItems="center">
      {mapSpillLocs(getSpillLocs(mappedPcm)())(loc => (
        <PcmField key={loc} code={loc} mappedPcm={mappedPcm} />
      ))}
    </HStack>
  )
}

export default TemplateHori
