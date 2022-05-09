import DesktopNav from './desktop'
import MobileNav from './mobile'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { useIsMobile } from 'utils/hooks'

const Navigation = () => {
  const { clientId, realm } = apiConfig
  const value = realm
  const logoSrc = equals(value, 'internmatch')
    ? '/internmatch_new.png'
    : equals(value, 'mentormatch')
    ? '/MM_Primary_Fullcolour-1.png'
    : equals(value, 'lojing')
    ? '/lojing-logo.png'
    : equals(value, 'credmatch')
    ? '/credmatch_logo.jpg'
    : '/credmatch_logo.jpg'
  const isMobile = useIsMobile()
  console.log({ logoSrc, clientId, realm })
  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav value={value} logoSrc={logoSrc} />
}

export default Navigation
