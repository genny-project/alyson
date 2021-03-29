import { useIsMobile } from 'utils/hooks'

import MobileNav from './mobile'
import DesktopNav from './desktop'

const Navigation = () => {
  const isMobile = useIsMobile()

  return isMobile ? <MobileNav logoSrc={'/logo.png'} /> : <DesktopNav logoSrc={'/logo.png'} />
}

export default Navigation
