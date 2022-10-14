import { always, cond, equals } from 'ramda'

import TemplateHeaderDesktop from './tpl-header-desktop'
import TemplateHeaderMobile from './tpl-header-mobile'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'

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

  return isMobile ? (
    <TemplateHeaderMobile mappedPcm={mappedPcm} logoSrc={logoSrc} depth={depth} />
  ) : (
    <TemplateHeaderDesktop mappedPcm={mappedPcm} logoSrc={logoSrc} depth={depth} />
  )
}

export default TemplateHeader
