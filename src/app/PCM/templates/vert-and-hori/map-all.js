import { Box } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import notIncludesAny from 'utils/helpers/not-includes-any'
import { filter, keys, union } from 'ramda'

const mapAll = (mappedPcm, depth) => {
  const spillLocs = getSpillLocs(mappedPcm)

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

  const filteredUndefinedQuestionGroup = filter(item => !!item)(questionGrp)

  const mappedDefinedLocs = mapSpillLocs(loc => (
    <Box key={loc}>
      <PcmField code={loc} mappedPcm={mappedPcm} depth={depth} />
    </Box>
  ))(spillLocs)

  return union(mappedDefinedLocs)(filteredUndefinedQuestionGroup)
}

export default mapAll