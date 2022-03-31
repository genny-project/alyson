import TemplateRoot from './templates/template-root'
import TemplateDefault from './templates/template-default'
import TemplateVert from './templates/template-vert'
import { has, includes, reduce, find } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import TemplateSidebar from './templates/template-sidebar'

const Pcms = ({ code, appName }) => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const pcmCode = find(includes(code))(allPcmCode)

  const pcm = useSelector(selectCode(pcmCode, 'allAttributes'))
  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(pcm || [])

  var { PRI_TEMPLATE_CODE: templateCode } = mappedPcm

  const fromCode = {
    TPL_ROOT: <TemplateRoot mappedPcm={mappedPcm} appName={appName} />,
    TPL_VERT: <TemplateVert mappedPcm={mappedPcm} appName={appName} />,
    TPL_SIDEBAR: <TemplateSidebar mappedPcm={mappedPcm} appName={appName} />,
    TPL_DEFAULT: <TemplateDefault mappedPcm={mappedPcm} appName={appName} />,
  }

  /// Shows the root template while the page is loading. Don't like this much though
  if (templateCode === undefined && code === 'PCM_ROOT') {
    templateCode = 'TPL_ROOT'
  }

  if (!has(templateCode)(fromCode)) {
    console.log('Unknown template ' + templateCode)
    templateCode = 'TPL_DEFAULT'
  }

  return fromCode[templateCode]
}

export default Pcms
