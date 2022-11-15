import { Box, HStack } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import notIncludesAny from 'utils/helpers/not-includes-any'
import { filter, keys, map } from 'ramda'

const TemplateHoriAll = ({ mappedPcm, depth }) => {
  const spillLocs = getSpillLocs(mappedPcm)()

  const questionGrp = mapQuestionGroup((ask, question) => {
    const attributeCode =
      ask?.attributeCode ?? ask?.question?.attributeCode ?? question?.attributeCode ?? ''

    if (notIncludesAny(keys(spillLocs))(attributeCode)) {
      return (
        <Box key={attributeCode}>
          <PcmField code={attributeCode} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      )
    }
  })(mappedPcm.PRI_QUESTION_CODE)

  return (
    <HStack margin={'auto'} width="min(100%, 38.75rem)">
      {mapSpillLocs(loc => (
        <Box key={loc}>
          <PcmField code={loc} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      ))(spillLocs)}
      {map(box => box)(filter(box => !!box)(questionGrp))}
    </HStack>
  )
}

export default TemplateHoriAll
