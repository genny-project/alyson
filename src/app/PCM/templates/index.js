import TemplateNorth from 'app/PCM/templates/navigation/tpl-north'
import TemplateWest from 'app/PCM/templates/sidebar/tpl-west'
import TemplateHeader from './navigation/tpl-header'
import TemplateRoot from './tpl-root'
import TemplateSidebarOne from './sidebar/tpl-sidebar-one'
import TemplateVert from './tpl-vert'
import TemplateDisplay from './tpl-display'
import TemplateLogo from './tpl-logo'

const templateHandlerMachine = templateCode => properties => {
  const listOfTemplates = {
    TPL_NORTH: <TemplateNorth {...properties} />,
    TPL_WEST: <TemplateWest {...properties} />,
    TPL_ROOT: <TemplateRoot {...properties} />,
    TPL_SIDEBAR_1: <TemplateSidebarOne {...properties} />,
    TPL_VERT: <TemplateVert {...properties} />,
    TPL_HEADER_1: <TemplateHeader {...properties} />,
    TPL_DISPLAY: <TemplateDisplay {...properties} />,
    TPL_LOGO: <TemplateLogo {...properties} />,
  }
  return listOfTemplates[templateCode]
}

export default templateHandlerMachine
