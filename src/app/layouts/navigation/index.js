import DesktopNav from './desktop'
import MobileNav from './mobile'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'

const Navigation = () => {
  const logoSrc =
    apiConfig.realm === 'internmatch'
      ? '/favicon.png'
      : apiConfig.realm === 'mentormatch'
      ? '/MM_Primary_Fullcolour-1.png'
      : ''
      ? apiConfig.realm === 'credmatch'
      : '/credmatch_logo.jpg'
  const isMobile = useIsMobile()

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
