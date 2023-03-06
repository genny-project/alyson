import { equals, filter, includes, union, values } from 'ramda'

import { Box } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import notIncludes from 'utils/helpers/not-includes'

const mapAll = (mappedPcm, depth, isInternmatch = false, config = {}) => {
  const spillLocs = getSpillLocs(mappedPcm)
  let i = 0
  const questionGrp = mapQuestionGroup((ask, question) => {
    const attributeCode =
      ask?.attributeCode ?? ask?.question?.attributeCode ?? question?.attributeCode ?? ''

    if (notIncludes(attributeCode)(values(spillLocs))) {
      const evtAttrCode = includes('EVT_', attributeCode)
      const isEvtNext = equals(attributeCode, 'EVT_NEXT')
      const isEvtSubmit = equals(attributeCode, 'EVT_SUBMIT')
      i++
      return (
        <Box
          key={attributeCode}
          w={'full'}
          textAlign={
            (evtAttrCode || isEvtNext || isEvtSubmit) && isInternmatch && i !== 1 ? 'end' : 'start'
          }
        >
          <PcmField code={attributeCode} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      )
    }
  })(mappedPcm.PRI_QUESTION_CODE)

  const filteredUndefinedQuestionGroup = filter(item => !!item)(questionGrp)
  i = 0
  const mappedDefinedLocs = mapSpillLocs(loc => {
    i++
    return (
      <Box
        key={loc}
        w={'full'}
        textAlign={includes('EVENTS', loc) && isInternmatch && i !== 1 ? 'end' : 'start'}
      >
        <PcmField code={loc} mappedPcm={mappedPcm} depth={depth} config={config} />
      </Box>
    )
  })(spillLocs)

  return union(mappedDefinedLocs)(filteredUndefinedQuestionGroup)
}

export default mapAll
