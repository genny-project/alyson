import TemplateRoot from './templates/template-root'
import TemplateDefault from './templates/template-default'
import TemplateVert from './templates/template-vert'
import { includes, reduce, find } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import TemplateSidebarOne from './templates/template-sidebar-one'
import TemplateHeader from './templates/template-header'

import { CircularProgress } from '@chakra-ui/react'

const Pcms = ({ code }) => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const pcmCode = find(includes(code))(allPcmCode)
  const pcm = useSelector(selectCode(pcmCode, 'allAttributes'))

  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(pcm || [])

  var { PRI_TEMPLATE_CODE: templateCode } = mappedPcm

  if (templateCode === 'TPL_ROOT') {
    return <TemplateRoot mappedPcm={mappedPcm} />
  } else if (!templateCode && code === 'PCM_ROOT') {
    return <CircularProgress mt="5" isIndeterminate />
  } else if (templateCode === 'TPL_VERT') {
    return <TemplateVert mappedPcm={mappedPcm} />
  } else if (templateCode === 'TPL_SIDEBAR_1' || templateCode === 'TPL_WEST') {
    return <TemplateSidebarOne mappedPcm={mappedPcm} />
  } else if (templateCode === 'TPL_HEADER_1' || templateCode === 'TPL_NORTH') {
    return <TemplateHeader mappedPcm={mappedPcm} />
  } else {
    return <TemplateDefault mappedPcm={mappedPcm} />
  }
}

export default Pcms
