import DesktopNav from './desktop'
import MobileNav from './mobile'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'
import { equals } from 'ramda'

const Navigation = () => {
  const { clientId, realm } = apiConfig
  const value = clientId || realm
  console.log('Value: ', value)
  const logoSrc = equals(value, 'alyson')
    ? '/internmatch_new.png'
    : equals(value, 'mentormatch')
    ? '/MM_Primary_Fullcolour-1.png'
    : equals(value, 'lojing')
    ? '/lojing-logo.png'
    : equals(value, 'credmatch')
    ? '/credmatch_logo.jpg'
    : '/credmatch_logo.jpg'
  const isMobile = useIsMobile()

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
