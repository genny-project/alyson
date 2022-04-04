import TemplateRoot from './templates/template-root'
import TemplateDefault from './templates/template-default'
import TemplateVert from './templates/template-vert'
import { includes, reduce, find } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import TemplateSidebar from './templates/template-sidebar'
import TemplateHeader from './templates/template-header'

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
    return <TemplateRoot mappedPcm={mappedPcm} />
  } else if (templateCode === 'TPL_VERT') {
    return <TemplateVert mappedPcm={mappedPcm} />
  } else if (templateCode === 'TPL_SIDEBAR' || templateCode === 'TPL_WEST') {
    return <TemplateSidebar mappedPcm={mappedPcm} />
  } else if (templateCode === 'TPL_HEADER' || templateCode === 'TPL_NORTH') {
    return <TemplateHeader mappedPcm={mappedPcm} />
  } else {
    return <TemplateDefault mappedPcm={mappedPcm} />
  }
}

export default Pcms
