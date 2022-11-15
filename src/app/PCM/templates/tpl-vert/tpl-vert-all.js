import { Box, VStack } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import notIncludesAny from 'utils/helpers/not-includes-any'
import { filter, keys, map } from 'ramda'

const TemplateVertAll = ({ mappedPcm, depth }) => {
  const spillLocs = getSpillLocs(mappedPcm)()

  const questionGrp = mapQuestionGroup((ask, question) => {
    const attributeCode =
      ask?.attributeCode ?? ask?.question?.attributeCode ?? question?.attributeCode ?? ''

    if (notIncludesAny(keys(spillLocs))()) {
      return (
        <Box key={attributeCode}>
          <PcmField code={attributeCode} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      )
    } else {
      return undefined
    }
  })(mappedPcm.PRI_QUESTION_CODE)

  return (
    <VStack alignItems="start" spacing="5">
      {mapSpillLocs(loc => (
        <Box key={loc}>
          <PcmField code={loc} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      ))}
      {map(box => box)(filter(box => !!box)(questionGrp))}
    </VStack>
  )
}

export default TemplateVertAll
