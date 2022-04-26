import { VStack } from '@chakra-ui/react'
import getPcmField from 'app/PCM/helpers/get-pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'

/**
 * Returns all attributes in a vertical list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 * @returns
 */
const TemplateVert = ({ mappedPcm }) => {
  return (
    <VStack test-id={mappedPcm.PRI_QUESTION_CODE} justifyContent="center">
      {mapSpillLocs(getSpillLocs(mappedPcm)())(loc => {
        return getPcmField(loc, mappedPcm)()
      })}
    </VStack>
  )
}

export default TemplateVert
