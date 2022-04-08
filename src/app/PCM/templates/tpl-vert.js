import { VStack } from '@chakra-ui/react'
import getPcmField from 'app/PCM/helpers/get-pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'

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
