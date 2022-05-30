import DesktopNav from './desktop'
import MobileNav from './mobile'
import { apiConfig } from 'config/get-api-config'
import { cond, equals, always } from 'ramda'
import { useIsMobile } from 'utils/hooks'

const Navigation = () => {
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

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
