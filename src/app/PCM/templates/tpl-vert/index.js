import { VStack } from '@chakra-ui/react'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'

/**
 * Returns all attributes in a vertical list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 * @returns
 */
const TemplateVert = ({ mappedPcm }) => {
  return (
    <VStack test-id={mappedPcm.PRI_QUESTION_CODE} justifyContent="center">
      {mapSpillLocs(getSpillLocs(mappedPcm)())(loc => (
        <PcmField code={loc} mappedPcm={mappedPcm} />
      ))}
    </VStack>
  )
}

export default TemplateVert
