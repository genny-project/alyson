import { useIsMobile } from 'utils/hooks'

import MobileNav from './mobile'
import DesktopNav from './desktop'

const getLogo = () => '/logo.png'

const Navigation = () => {
  const isMobile = useIsMobile()
  const logoSrc = getLogo()

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
