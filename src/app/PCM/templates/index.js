import { Box, Text } from '@chakra-ui/react'
import { TemplateHori, TemplateVert } from './vert-and-hori'

import TemplateAddItems from 'app/PCM/templates/tpl-add-items'
import TemplateApplicationDetailView from 'app/PCM/templates/tpl-detail-view/tpl-application-detail-view'
import TemplateAvatar from 'app/PCM/templates/tpl-avatar'
import TemplateBell from 'app/PCM/templates/tpl-bell'
import TemplateCard from 'app/PCM/templates/tpl-card'
import TemplateContent from 'app/PCM/templates/tpl-content'
import TemplateDefault from 'app/PCM/templates/tpl-default'
import TemplateDetailView from 'app/PCM/templates/tpl-detail-view'
import TemplateDisplay from 'app/PCM/templates/tpl-display'
import TemplateForm from 'app/PCM/templates/tpl-form'
import TemplateHeader from 'app/PCM/templates/tpl-header'
import TemplateHorizontalCards from 'app/PCM/templates/tpl_horizontal_cards'
import TemplateLogo from 'app/PCM/templates/tpl-logo'
import TemplatePopup from 'app/PCM/templates/tpl_popup'
import TemplateProcess from 'app/PCM/templates/tpl-process'
import TemplateProgressBar from 'app/PCM/templates/tpl-progress-bar'
import TemplatePropertyDetailView from 'app/PCM/templates/tpl-detail-view/tpl-property-detail-view'
import TemplateRoot from 'app/PCM/templates/tpl-root'
import TemplateSBEDetailView from 'app/PCM/templates/tpl-detail-view/tpl-sbe-detail-view'
import TemplateSBERowAdd from 'app/PCM/templates/tpl-sbe-row-add'
import TemplateSBESelect from 'app/PCM/templates/tpl-sbe-select'
import TemplateSearchBar from 'app/PCM/templates/tpl-search-bar'
import TemplateSidebarOne from 'app/PCM/templates/tpl-sidebar-one'
import TemplateSubmitApplication from 'app/PCM/templates/tpl-submit-application/index.js'
import TemplateTable from 'app/PCM/templates/tpl-table'
import TemplateText from 'app/PCM/templates/text-templates'
import TemplateVerticalCards from 'app/PCM/templates/tpl_vertical_cards'
import debugOut from 'utils/debug-out'
import hasNot from 'utils/helpers/has-not'
import showTemplateNames from 'utils/helpers/show-template-names'

/**
 * Takes in a mappedPcm, a templateCode and some misc properties and returns a template component.
 *
 * If the template does not exist, it will return the default template
 *
 */
const templateHandlerMachine = depth => mappedPcm => parentCode => rest => {
  const mandatoryProps = {
    mappedPcm,
    depth,
    parentCode,
    ...rest,
  }

  const listOfTemplates = {
    TPL_DEFAULT: <TemplateDefault />,
    TPL_ROOT: <TemplateRoot showTemplateNames={showTemplateNames} {...mandatoryProps} />,
    TPL_SIDEBAR_1: <TemplateSidebarOne {...mandatoryProps} />,
    TPL_VERT: <TemplateVert {...mandatoryProps} />,
    TPL_VERT_ALL: <TemplateVert {...mandatoryProps} />,
    TPL_HORI: <TemplateHori {...mandatoryProps} />,
    TPL_HORI_ALL: <TemplateHori {...mandatoryProps} />,
    TPL_HORI_CARD: <TemplateHori showCard {...mandatoryProps} />,
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
    TPL_TEXT_RED: <TemplateText {...mandatoryProps} />,
    TPL_CARD: <TemplateCard {...mandatoryProps} />,
    TPL_DETAIL_VIEW: <TemplateDetailView {...mandatoryProps} />,
    TPL_HORIZONTAL_CARDS: <TemplateHorizontalCards {...mandatoryProps} />,
    TPL_PROCESS: <TemplateProcess {...mandatoryProps} />,
    TPL_ADD_ITEMS: <TemplateAddItems {...mandatoryProps} />,
    TPL_BELL: <TemplateBell {...mandatoryProps} />,
    TPL_AVATAR: <TemplateAvatar {...mandatoryProps} />,
    TPL_PROPERTY_DETAIL_VIEW: <TemplatePropertyDetailView {...mandatoryProps} />,
    TPL_APPLICATION_DETAIL_VIEW: <TemplateApplicationDetailView {...mandatoryProps} />,
    TPL_SBE_DETAIL_VIEW: <TemplateSBEDetailView {...mandatoryProps} />,
    TPL_POPUP: <TemplatePopup {...mandatoryProps} />,
    TPL_SBE_ROW_ADD: <TemplateSBERowAdd {...mandatoryProps} />,
    TPL_SBE_SELECT: <TemplateSBESelect {...mandatoryProps} />,
    TPL_VERTICAL_CARDS: <TemplateVerticalCards {...mandatoryProps} />,
    TPL_SEARCH_BAR: <TemplateSearchBar {...mandatoryProps} />,
    TPL_SUBMIT_APPLICATION: <TemplateSubmitApplication {...mandatoryProps} />,
  }

  const { PRI_TEMPLATE_CODE: templateCode } = mappedPcm
  let noMatchingTemplates = hasNot(templateCode)(listOfTemplates)
  const defaultTemplate = <TemplateDefault />
  let matchingTemplate = listOfTemplates[templateCode]
  let template = noMatchingTemplates ? defaultTemplate : matchingTemplate

  if (noMatchingTemplates) {
    debugOut.warn(`No template exists for code: ${templateCode}! Falling back on default tempalte!`)
    return undefined
  }

  const code = mappedPcm?.code || mappedPcm?.PRI_NAME || 'No code or name'

  const color = Math.random().toString(16).substr(-6)

  return showTemplateNames ? (
    <Box position={'relative'}>
      <Text
        position={'absolute'}
        top={0}
        left={0}
        fontSize={'sm'}
        bg={`#${color}` || 'red'}
        color={'white'}
        px={3}
        wordBreak={'break-word'}
      >
        {noMatchingTemplates
          ? `TPL_DEFAULT (Couldn't find ${templateCode})`
          : `${templateCode}-${code}`}
      </Text>
      <Box pt={7} pb={4} px={4} outline={`1px solid #${color || 'red'}`} outlineOffset={-1}>
        {template}
      </Box>
    </Box>
  ) : (
    template
  )
}

export default templateHandlerMachine
