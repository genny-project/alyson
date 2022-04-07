import TemplateNorth from 'app/PCM/templates/navigation/tpl-north.js'
import TemplateWest from 'app/PCM/templates/sidebar/tpl-west.js'
import TemplateHeader from './tpl-header'
import TemplateRoot from './tpl-root'
import TemplateSidebarOne from './sidebar/tpl-sidebar-one'
import TemplateVert from './tpl-vert'

const templateHandlerMachine = templateCode => properties => {
  const listOfTemplates = {
    TPL_NORTH: <TemplateNorth {...properties} />,
    TPL_WEST: <TemplateWest {...properties} />,
    TPL_ROOT: <TemplateRoot {...properties} />,
    TPL_SIDEBAR_1: <TemplateSidebarOne {...properties} />,
    TPL_VERT: <TemplateVert {...properties} />,
    TPL_HEADER_1: <TemplateHeader {...properties} />,
  }
  return listOfTemplates[templateCode]
}

export default templateHandlerMachine
