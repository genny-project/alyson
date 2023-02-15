import { always, cond, equals } from 'ramda'

import TemplateHeaderMobile from 'app/PCM/templates/tpl-header/tpl-header-mobile'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'
import { useIsProductLojing } from 'utils/helpers/check-product-name'
import TemplateHeaderDesktopInternmatch from 'app/PCM/templates/tpl-header/tpl-header-desktop/internmatch'
import TemplateHeaderDesktopLojing from 'app/PCM/templates/tpl-header/tpl-header-desktop/lojing'

const TemplateHeader = ({ mappedPcm, depth }) => {
  const { clientId, realm } = apiConfig

  const getLogoSrc = cond([
    [equals('internmatch') || equals('alyson'), always('/internmatch_new.png')],
    [equals('mentormatch'), always('/MM_Primary_Fullcolour-1.png')],
    [equals('lojing'), always('/lojing-logo.png')],
    [equals('credmatch'), always('/credmatch_logo.jpg')],
  ])

  const logoSrcFromRealm = getLogoSrc(realm)
  const logoSrcFromClientId = getLogoSrc(clientId)

  const logoSrc = logoSrcFromRealm || logoSrcFromClientId

  const isMobile = useIsMobile()
  const isProductLojing = useIsProductLojing()

  return isMobile ? (
    <TemplateHeaderMobile mappedPcm={mappedPcm} logoSrc={logoSrc} depth={depth} />
  ) : isProductLojing ? (
    <TemplateHeaderDesktopLojing mappedPcm={mappedPcm} logoSrc={logoSrc} depth={depth} />
  ) : (
    <TemplateHeaderDesktopInternmatch mappedPcm={mappedPcm} depth={depth} />
  )
}

export default TemplateHeader
