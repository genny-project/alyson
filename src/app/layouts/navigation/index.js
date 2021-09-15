import { useIsMobile } from 'utils/hooks'
import { apiConfig } from 'config/get-api-config'

import MobileNav from './mobile'
import DesktopNav from './desktop'

const Navigation = () => {
  const logoSrc =
    apiConfig.realm === 'internmatch'
      ? '/favicon.png'
      : apiConfig.realm === 'mentormatch'
      ? '/logo.png'
      : ''
  const isMobile = useIsMobile()

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
