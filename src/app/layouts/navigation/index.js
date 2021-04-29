import { useColorModeValue } from '@chakra-ui/react'
import { useIsMobile } from 'utils/hooks'

import MobileNav from './mobile'
import DesktopNav from './desktop'

const getLogo = () => '/logo.png'

const Navigation = () => {
  const logoSrc = useColorModeValue(getLogo(true), getLogo())
  const isMobile = useIsMobile()

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
