import { equals, filter, includes, union, values } from 'ramda'

import { Box } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import notIncludes from 'utils/helpers/not-includes'

const mapAll = (mappedPcm, depth, isInternmatch = false, config = {}) => {
  const spillLocs = getSpillLocs(mappedPcm)
  const questionGrp = mapQuestionGroup((ask, question, index, count) => {
    const attributeCode =
      ask?.attributeCode ?? ask?.question?.attributeCode ?? question?.attributeCode ?? ''

    const isEvtExploreProperties = equals(attributeCode, 'EVT_EXPLORE_PROPERTIES')
    const isEvtGetPreApproved = equals(attributeCode, 'EVT_GET_PRE_APPROVED')
    const isEvtCreateLivingProfile = equals(attributeCode, 'EVT_CREATE_LIVING_PROFILE')

    const isLivingProfileEvents =
      isEvtExploreProperties || isEvtGetPreApproved || isEvtCreateLivingProfile

    if (notIncludes(attributeCode)(values(spillLocs))) {
      const evtAttrCode = includes('EVT_', attributeCode)
      const isEvtNext = equals(attributeCode, 'EVT_NEXT')
      const isEvtSubmit = equals(attributeCode, 'EVT_SUBMIT')
      return (
        <Box
          _empty={{ display: 'none' }}
          key={attributeCode}
          w={isLivingProfileEvents ? 'auto' : 'full'}
          textAlign={
            isInternmatch &&
            (evtAttrCode || isEvtNext || isEvtSubmit) &&
            (index !== 0 || count === 1)
              ? 'end'
              : isInternmatch
              ? 'start'
              : 'center'
          }
        >
          <PcmField code={attributeCode} mappedPcm={mappedPcm} depth={depth} />
        </Box>
      )
    }
  })(mappedPcm.PRI_QUESTION_CODE)

  const filteredUndefinedQuestionGroup = filter(item => !!item)(questionGrp)

  const mappedDefinedLocs = mapSpillLocs(loc => {
    const isEvtExploreProperties = equals(loc, 'EVT_EXPLORE_PROPERTIES')
    const isEvtGetPreApproved = equals(loc, 'EVT_GET_PRE_APPROVED')
    const isEvtCreateLivingProfile = equals(loc, 'EVT_CREATE_LIVING_PROFILE')

    const isLivingProfileEvents =
      isEvtExploreProperties || isEvtGetPreApproved || isEvtCreateLivingProfile

    const isImageUploadTitle = includes('IMAGE_UPLOAD_TITLE', loc)
    const isImageUploadQue = includes('IMAGE_UPLOAD_QUE', loc)
    return (
      <Box
        _empty={{ display: 'none' }}
        key={loc}
        w={isLivingProfileEvents ? 'auto' : 'full'}
        textAlign={includes('EVENTS', loc) && isInternmatch ? 'end' : 'start'}
        flex={isImageUploadTitle ? '0 0 14rem' : isImageUploadQue ? '0 0 calc(100% - 15rem)' : 1}
      >
        <PcmField code={loc} mappedPcm={mappedPcm} depth={depth} config={config} />
      </Box>
    )
  })(spillLocs)

  return union(mappedDefinedLocs)(filteredUndefinedQuestionGroup)
}

export default mapAll
