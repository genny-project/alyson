import TemplateNorth from 'app/PCM/templates/navigation/tpl-north'
import TemplateWest from 'app/PCM/templates/sidebar/tpl-west'
import TemplateHeader from 'app/PCM/templates/navigation/tpl-header'
import TemplateRoot from 'app/PCM/templates/tpl-root'
import TemplateSidebarOne from 'app/PCM/templates/sidebar/tpl-sidebar-one'
import TemplateVert from 'app/PCM/templates/tpl-vert'
import TemplateHori from 'app/PCM/templates/tpl-hori'
import TemplateDisplay from 'app/PCM/templates/tpl-display'
import TemplateDefault from 'app/PCM/templates/tpl-default'
import TemplateLogo from 'app/PCM/templates/tpl-logo'
import TemplateProgressBar from 'app/PCM/templates/tpl-progress-bar'
import TemplateLojingHeader from 'app/PCM/templates/tpl-lojing-header'
import TemplateForm from 'app/PCM/templates/tpl-form'
import hasNot from 'utils/helpers/has-not.js'
import debugOut from 'utils/debug-out'
import TemplateTable from './tpl-table'

/**
 * Takes in a mappedPcm, a templateCode and some misc properties and returns a template component.
 *
 * If the template does not exist, it will return the default template
 *
 */
const templateHandlerMachine = mappedPcm => templateCode => properties => {
  const listOfTemplates = {
    TPL_DEFAULT: <TemplateDefault {...properties} />,
    TPL_NORTH: <TemplateNorth mappedPcm={mappedPcm} {...properties} />,
    TPL_WEST: <TemplateWest mappedPcm={mappedPcm} {...properties} />,
    TPL_ROOT: <TemplateRoot mappedPcm={mappedPcm} {...properties} />,
    TPL_SIDEBAR_1: <TemplateSidebarOne mappedPcm={mappedPcm} {...properties} />,
    TPL_VERT: <TemplateVert mappedPcm={mappedPcm} {...properties} />,
    TPL_HORI: <TemplateHori mappedPcm={mappedPcm} {...properties} />,
    TPL_HEADER_1: <TemplateHeader mappedPcm={mappedPcm} {...properties} />,
    TPL_DISPLAY: <TemplateDisplay mappedPcm={mappedPcm} {...properties} />,
    TPL_LOGO: <TemplateLogo mappedPcm={mappedPcm} {...properties} />,
    TPL_PROGRESS_BAR: <TemplateProgressBar mappedPcm={mappedPcm} {...properties} />,
    TPL_LOJING_HEADER: <TemplateLojingHeader mappedPcm={mappedPcm} {...properties} />,
    TPL_FORM: <TemplateForm mappedPcm={mappedPcm} {...properties} />,
    TPL_TABLE: <TemplateTable mappedPcm={mappedPcm} {...properties} />,
  }

  if (hasNot(templateCode)(listOfTemplates)) {
    debugOut.error(
      `No template exists for code: ${templateCode}! Falling back on default tempalte!`,
    )
    return <TemplateDefault {...properties} />
  }

  return listOfTemplates[templateCode]
}

export default templateHandlerMachine
