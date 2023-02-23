import { equals, filter, includes, union, values } from 'ramda'

import { Box } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import notIncludes from 'utils/helpers/not-includes'

const mapAll = (mappedPcm, depth, config = {}) => {
  const spillLocs = getSpillLocs(mappedPcm)

  const questionGrp = mapQuestionGroup((ask, question) => {
    const attributeCode =
      ask?.attributeCode ?? ask?.question?.attributeCode ?? question?.attributeCode ?? ''

    if (notIncludes(attributeCode)(values(spillLocs))) {
      const evtAttrCode = includes(attributeCode, 'EVT_')

      return (
        <Box key={attributeCode} w={evtAttrCode ? 'auto' : 'full'}>
          <PcmField code={attributeCode} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      )
    }
  })(mappedPcm.PRI_QUESTION_CODE)

  const filteredUndefinedQuestionGroup = filter(item => !!item)(questionGrp)

  const mappedDefinedLocs = mapSpillLocs(loc => (
    <Box key={loc} w={equals(loc, 'PCM_EVENTS') ? 'auto' : 'full'}>
      <PcmField code={loc} mappedPcm={mappedPcm} depth={depth} config={config} />
    </Box>
  ))(spillLocs)

  return union(mappedDefinedLocs)(filteredUndefinedQuestionGroup)
}

export default mapAll
