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
import TemplateSidebarOne from 'app/PCM/templates/tpl-sidebar-one'
import TemplateTable from './tpl-table'
import TemplateText from './text-templates'
import TemplateVert from 'app/PCM/templates/tpl-vert'
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
  const mandatoryProps = {
    mappedPcm,
    depth,
    ...properties,
  }

  const listOfTemplates = {
    TPL_DEFAULT: <TemplateDefault />,
    TPL_ROOT: <TemplateRoot {...mandatoryProps} />,
    TPL_SIDEBAR_1: <TemplateSidebarOne {...mandatoryProps} />,
    TPL_VERT: <TemplateVert {...mandatoryProps} />,
    TPL_HORI: <TemplateHori {...mandatoryProps} />,
    TPL_HEADER_1: <TemplateHeader {...mandatoryProps} />,
    TPL_DISPLAY: <TemplateDisplay {...mandatoryProps} />,
    TPL_LOGO: <TemplateLogo {...mandatoryProps} />,
    TPL_PROGRESS_BAR: <TemplateProgressBar {...mandatoryProps} />,
    TPL_FORM: <TemplateForm {...mandatoryProps} />,
    TPL_TABLE: <TemplateTable {...mandatoryProps} />,
    TPL_CONTENT: <TemplateContent {...mandatoryProps} />,
    TPL_TEXT_BODY_1: <TemplateText {...mandatoryProps} />,
    TPL_TEXT_BODY_2: <TemplateText {...mandatoryProps} />,
    TPL_TEXT_HEADER_1: <TemplateText {...mandatoryProps} />,
    TPL_TEXT_HEADER_2: <TemplateText {...mandatoryProps} />,
    TPL_TEXT_HEADER_3: <TemplateText {...mandatoryProps} />,
    TPL_TEXT_HEADER_4: <TemplateText {...mandatoryProps} />,
    TPL_TEXT_HEADER_5: <TemplateText {...mandatoryProps} />,
    TPL_TEXT_HEADER_6: <TemplateText {...mandatoryProps} />,
    TPL_CARD: <TemplateCard {...mandatoryProps} />,
    TPL_DETAIL_VIEW: <TemplateDetailView {...mandatoryProps} />,
    TPL_HORIZONTAL_CARDS: <TemplateHorizontalCards {...mandatoryProps} />,
    TPL_PROCESS: <TemplateProcess {...mandatoryProps} />,
    TPL_ADD_ITEMS: <TemplateAddItems {...mandatoryProps} />,
    TPL_BELL: <TemplateBell {...mandatoryProps} />,
    TPL_AVATAR: <TemplateAvatar {...mandatoryProps} />,
    TPL_PROPERTY_DETAIL_VIEW: <TemplatePropertyDetailView {...mandatoryProps} />,
    TPL_APPLICATION_DETAIL_VIEW: <TemplateApplicationDetailView {...mandatoryProps} />,
    TPL_POPUP: <TemplatePopup {...mandatoryProps} />,
  }

  let noMatchingTemplates = hasNot(templateCode)(listOfTemplates)
  const defaultTemplate = <TemplateDefault />
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
