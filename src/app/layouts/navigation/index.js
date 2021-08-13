import { useIsMobile } from 'utils/hooks'

import MobileNav from './mobile'
import DesktopNav from './desktop'
import { apiConfig } from 'config/get-api-config'

const Navigation = () => {
  const isMobile = useIsMobile()
  const logoSrc = apiConfig.PRI_LOGO

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
