import { VStack } from '@chakra-ui/react'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'

/**
 * Returns all mapped attributes in a vertical list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
const TemplateVert = ({ mappedPcm }) => {
  return (
    <VStack justifyContent="center">
      {mapSpillLocs(getSpillLocs(mappedPcm)())(loc => (
        <PcmField key={loc} code={loc} mappedPcm={mappedPcm} />
      ))}
    </VStack>
  )
}

export default TemplateVert
