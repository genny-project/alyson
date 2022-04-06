import TemplateNorth from 'app/PCM/templates/navigation/tpl-north.js'
import TemplateWest from 'app/PCM/templates/sidebar/tpl-west.js'

const templateHandlerMachine = templateCode => properties => {
  const listOfTemplates = {
    TPL_NORTH: <TemplateNorth {...properties} />,
    TPL_WEST: <TemplateWest {...properties} />,
  }
  return listOfTemplates[templateCode]
}

export default templateHandlerMachine
