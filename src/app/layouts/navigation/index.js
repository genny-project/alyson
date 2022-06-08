import DesktopNav from './desktop'
import MobileNav from './mobile'
import { apiConfig } from 'config/get-api-config'
import { cond, equals, always } from 'ramda'
import { useIsMobile } from 'utils/hooks'

const Navigation = () => {
  const { clientId, realm } = apiConfig

  /* I hate this but alyson client id is still a thing so until we deal
   with that properly */
  const isInternmatch = equals(clientId, 'alyson') || equals(clientId, 'internmatch')
  const value = clientId
  const logoSrc = isInternmatch
    ? '/internmatch_new.png'
    : equals(value, 'mentormatch')
    ? '/MM_Primary_Fullcolour-1.png'
    : equals(value, 'lojing')
    ? '/lojing-logo.png'
    : equals(value, 'credmatch')
    ? '/credmatch_logo.jpg'
    : '/credmatch_logo.jpg'
  const isMobile = useIsMobile()

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav value={value} logoSrc={logoSrc} />
}

export default Navigation
