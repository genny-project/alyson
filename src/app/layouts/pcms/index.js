import TemplateRoot from './templates/template-root'
import TemplateDefault from './templates/template-default'
import TemplateVert from './templates/template-vert'
import { has, includes, reduce, find } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import TemplateSidebar from './templates/template-sidebar'
import PcmField from './templates/pcm-field'
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

  const fromCode = {
    TPL_ROOT: <TemplateRoot mappedPcm={mappedPcm} />,
    TPL_VERT: <TemplateVert mappedPcm={mappedPcm} />,
    TPL_SIDEBAR: <TemplateSidebar mappedPcm={mappedPcm} />,
    TPL_HEADER: <TemplateHeader mappedPcm={mappedPcm} />,
    TPL_DEFAULT: <TemplateDefault mappedPcm={mappedPcm} />,
  }

  /// Shows the root template while the page is loading. Don't like this much though
  if (!templateCode && code === 'PCM_ROOT') {
    templateCode = 'TPL_ROOT'
  }

  if (!has(templateCode)(fromCode)) {
    templateCode = 'TPL_DEFAULT'
  }

  return fromCode[templateCode]
}

export default Pcms
