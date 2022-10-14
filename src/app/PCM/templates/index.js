import TemplateAddItems from './tpl-add-items'
import TemplateApplicationDetailView from './tpl-detail-view/tpl-application-detail-view'
import TemplateAvatar from './tpl-avatar'
import TemplateBell from './tpl-bell'
import TemplateCard from './tpl-card'
import TemplateContent from './tpl-content'
import TemplateDefault from 'app/PCM/templates/tpl-default'
import TemplateDisplay from 'app/PCM/templates/tpl-display'
import TemplateForm from 'app/PCM/templates/tpl-form'
import TemplateHeader from 'app/PCM/templates/tpl-header'
import TemplateHori from 'app/PCM/templates/tpl-hori'
import TemplateHorizontalCards from './tpl_horizontal_cards'
import TemplateLogo from 'app/PCM/templates/tpl-logo'
import TemplateProcess from './tpl-process'
import TemplateProgressBar from 'app/PCM/templates/tpl-progress-bar'
import TemplatePropertyDetailView from './tpl-detail-view/tpl-property-detail-view'
import TemplateRoot from 'app/PCM/templates/tpl-root'
import TemplateSidebarOne from 'app/PCM/templates/sidebar/tpl-sidebar-one'
import TemplateTable from './tpl-table'
import TemplateText from './text-templates'
import TemplateVert from 'app/PCM/templates/tpl-vert'
import TemplateWest from 'app/PCM/templates/sidebar/tpl-west'
import debugOut from 'utils/debug-out'
import hasNot from 'utils/helpers/has-not.js'
import TemplateDetailView from './tpl-detail-view'
import showTemplateNames from 'utils/helpers/show-template-names'
import { Box, Text } from '@chakra-ui/react'
import TemplatePopup from './tpl_popup'

/**
 * Takes in a mappedPcm, a templateCode and some misc properties and returns a template component.
 *
 * If the template does not exist, it will return the default template
 *
 */
const templateHandlerMachine = depth => mappedPcm => templateCode => properties => {
  const listOfTemplates = {
    TPL_DEFAULT: <TemplateDefault {...properties} />,
    TPL_WEST: <TemplateWest mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_ROOT: <TemplateRoot mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_SIDEBAR_1: <TemplateSidebarOne mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_VERT: <TemplateVert mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_HORI: <TemplateHori mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_HEADER_1: <TemplateHeader mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_DISPLAY: <TemplateDisplay mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_LOGO: <TemplateLogo mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_PROGRESS_BAR: <TemplateProgressBar mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_FORM: <TemplateForm mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TABLE: <TemplateTable mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_CONTENT: <TemplateContent mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TEXT_BODY_1: <TemplateText mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TEXT_BODY_2: <TemplateText mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TEXT_HEADER_1: <TemplateText mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TEXT_HEADER_2: <TemplateText mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TEXT_HEADER_3: <TemplateText mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TEXT_HEADER_4: <TemplateText mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TEXT_HEADER_5: <TemplateText mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_TEXT_HEADER_6: <TemplateText mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_CARD: <TemplateCard mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_DETAIL_VIEW: <TemplateDetailView mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_HORIZONTAL_CARDS: (
      <TemplateHorizontalCards mappedPcm={mappedPcm} depth={depth} {...properties} />
    ),
    TPL_PROCESS: <TemplateProcess mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_ADD_ITEMS: <TemplateAddItems mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_BELL: <TemplateBell mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_AVATAR: <TemplateAvatar mappedPcm={mappedPcm} depth={depth} {...properties} />,
    TPL_PROPERTY_DETAIL_VIEW: (
      <TemplatePropertyDetailView mappedPcm={mappedPcm} depth={depth} {...properties} />
    ),
    TPL_APPLICATION_DETAIL_VIEW: (
      <TemplateApplicationDetailView mappedPcm={mappedPcm} depth={depth} {...properties} />
    ),
    TPL_POPUP: <TemplatePopup mappedPcm={mappedPcm} depth={depth} {...properties} />,
  }

  let noMatchingTemplates = hasNot(templateCode)(listOfTemplates)
  const defaultTemplate = <TemplateDefault {...properties} />
  let matchingTemplate = listOfTemplates[templateCode]
  let template = noMatchingTemplates ? defaultTemplate : matchingTemplate

  if (noMatchingTemplates) {
    debugOut.warn(`No template exists for code: ${templateCode}! Falling back on default tempalte!`)
  }

  return showTemplateNames ? (
    <Box>
      <Text>
        {noMatchingTemplates ? `TPL_DEFAULT (Couldn't find ${templateCode})` : templateCode}
      </Text>
      <Box border="solid 2px red">{template}</Box>
    </Box>
  ) : (
    template
  )
}

export default templateHandlerMachine
