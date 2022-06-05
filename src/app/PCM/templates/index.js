import TemplateNorth from 'app/PCM/templates/navigation/tpl-north'
import TemplateWest from 'app/PCM/templates/sidebar/tpl-west'
import TemplateHeader from './navigation/tpl-header'
import TemplateRoot from './tpl-root'
import TemplateSidebarOne from './sidebar/tpl-sidebar-one'
import TemplateVert from './tpl-vert'
import TemplateDisplay from './tpl-display'
import TemplateDefault from './tpl-default'
import TemplateLogo from './tpl-logo'
import TemplateProgressBar from './tpl-progress-bar'
import TemplateLojingHeader from './tpl-lojing-header'
import hasNot from 'utils/helpers/has-not.js'

const templateHandlerMachine = mappedPcm => templateCode => properties => {
  const listOfTemplates = {
    TPL_NORTH: <TemplateNorth mappedPcm={mappedPcm} {...properties} />,
    TPL_WEST: <TemplateWest mappedPcm={mappedPcm} {...properties} />,
    TPL_ROOT: <TemplateRoot mappedPcm={mappedPcm} {...properties} />,
    TPL_SIDEBAR_1: <TemplateSidebarOne mappedPcm={mappedPcm} {...properties} />,
    TPL_VERT: <TemplateVert mappedPcm={mappedPcm} {...properties} />,
    TPL_HEADER_1: <TemplateHeader mappedPcm={mappedPcm} {...properties} />,
    TPL_DISPLAY: <TemplateDisplay mappedPcm={mappedPcm} {...properties} />,
    TPL_LOGO: <TemplateLogo mappedPcm={mappedPcm} {...properties} />,
    TPL_PROGRESS_BAR: <TemplateProgressBar mappedPcm={mappedPcm} {...properties} />,
    TPL_LOJING_HEADER: <TemplateLojingHeader mappedPcm={mappedPcm} {...properties} />,
  }

  if (hasNot(templateCode)(listOfTemplates)) {
    console.error('No template code ' + templateCode + '! Falling back on default.')
    return <TemplateDefault {...properties} />
  }

  return listOfTemplates[templateCode]
}

export default templateHandlerMachine
