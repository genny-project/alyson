import TemplateCard from './tpl-card'
import TemplateContent from './tpl-content'
import TemplateDefault from 'app/PCM/templates/tpl-default'
import TemplateDetailView from './tpl-detail-view'
import TemplateDisplay from 'app/PCM/templates/tpl-display'
import TemplateForm from 'app/PCM/templates/tpl-form'
import TemplateHeader from 'app/PCM/templates/navigation/tpl-header'
import TemplateHori from 'app/PCM/templates/tpl-hori'
import TemplateLogo from 'app/PCM/templates/tpl-logo'
import TemplateLojingHeader from 'app/PCM/templates/tpl-lojing-header'
import TemplateNorth from 'app/PCM/templates/navigation/tpl-north'
import TemplateProgressBar from 'app/PCM/templates/tpl-progress-bar'
import TemplateRoot from 'app/PCM/templates/tpl-root'
import TemplateSidebarOne from 'app/PCM/templates/sidebar/tpl-sidebar-one'
import TemplateTable from './tpl-table'
import TemplateText from './text-templates'
import TemplateVert from 'app/PCM/templates/tpl-vert'
import TemplateWest from 'app/PCM/templates/sidebar/tpl-west'
import debugOut from 'utils/debug-out'
import hasNot from 'utils/helpers/has-not.js'
import TemplateHorizontalCards from './tpl_horizontal_cards'
import TemplateProcess from './tpl-process'

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
    TPL_CONTENT: <TemplateContent mappedPcm={mappedPcm} {...properties} />,
    TPL_TEXT_BODY_1: <TemplateText mappedPcm={mappedPcm} {...properties} />,
    TPL_TEXT_BODY_2: <TemplateText mappedPcm={mappedPcm} {...properties} />,
    TPL_TEXT_HEADER_1: <TemplateText mappedPcm={mappedPcm} {...properties} />,
    TPL_TEXT_HEADER_2: <TemplateText mappedPcm={mappedPcm} {...properties} />,
    TPL_TEXT_HEADER_3: <TemplateText mappedPcm={mappedPcm} {...properties} />,
    TPL_TEXT_HEADER_4: <TemplateText mappedPcm={mappedPcm} {...properties} />,
    TPL_TEXT_HEADER_5: <TemplateText mappedPcm={mappedPcm} {...properties} />,
    TPL_TEXT_HEADER_6: <TemplateText mappedPcm={mappedPcm} {...properties} />,
    TPL_CARD: <TemplateCard mappedPcm={mappedPcm} {...properties} />,
    TPL_DETAIL_VIEW: <TemplateDetailView mappedPcm={mappedPcm} {...properties} />,
    TPL_HORIZONTAL_CARDS: <TemplateHorizontalCards mappedPcm={mappedPcm} {...properties} />,
    TPL_PROCESS: <TemplateProcess mappedPcm={mappedPcm} {...properties} />,
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
