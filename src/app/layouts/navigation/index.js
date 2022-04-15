import DesktopNav from './desktop'
import MobileNav from './mobile'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'

const Navigation = () => {
  const { clientId, realm } = apiConfig
  const value = clientId || realm
  const logoSrc =
    value === 'internmatch'
      ? '/internmatch_new.png'
      : value === 'mentormatch'
      ? '/MM_Primary_Fullcolour-1.png'
      : value === 'lojing'
      ? '/lojing-logo.png'
      : value === 'credmatch'
      ? '/credmatch_logo.jpg'
      : '/credmatch_logo.jpg'
  const isMobile = useIsMobile()

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
