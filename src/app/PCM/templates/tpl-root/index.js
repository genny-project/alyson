import { useRef } from 'react'
import { useColorModeValue, useDisclosure, useTheme } from '@chakra-ui/react'

import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'
import InternmatchRoot from 'app/PCM/templates/tpl-root/internmatch'
import LojingRoot from 'app/PCM/templates/tpl-root/lojing'
import { useIsProductLojing } from 'utils/helpers/check-product-name'

/**
 * The root template for an application. Contains a sidebar, header and a body content.
 *
 * Template Code: `TPL_ROOT`
 *
 *
 * LOCS:
 *
 * `PRI_LOC1` -> The Header <br/>
 *
 * `PRI_LOC2` -> The Sidebar <br/>
 *
 * `PRI_LOC3` -> The Main content being displayed
 *
 */

const TemplateRoot = ({ mappedPcm, depth, showTemplateNames }) => {
  const theme = useTheme()
  const btnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3 } = mappedPcm

  const isProductLojing = useIsProductLojing()

  // THEME COLORS
  //need to fix this, we cannot get colours this way
  const { lightColor, appWrapperInlinePadding } = useProductColors()
  const darkColor =
    useGetAttributeFromProjectBaseEntity('PRI_COLOR_BACKGROUND_ON')?.valueString ||
    theme.colors.background['dark']
  const color = useColorModeValue(darkColor, lightColor)

  const isMobile = useIsMobile()
  const props = {
    isMobile,
    color,
    lightColor,
    theme,
    btnRef,
    PRI_LOC1,
    mappedPcm,
    depth,
    onOpen,
    isOpen,
    onClose,
    PRI_LOC2,
    showTemplateNames,
    PRI_LOC3,
    appWrapperInlinePadding,
  }
  return isProductLojing ? <LojingRoot {...props} /> : <InternmatchRoot {...props} />
}

export default TemplateRoot
