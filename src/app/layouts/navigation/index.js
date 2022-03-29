import DesktopNav from './desktop'
import MobileNav from './mobile'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'

const Navigation = () => {
  const { realm } = apiConfig
  const logoSrc =
    realm === 'internmatch'
      ? '/internmatch_new.png'
      : realm === 'mentormatch'
      ? '/MM_Primary_Fullcolour-1.png'
      : realm === 'lojing'
      ? '/lojing-logo.png'
      : realm === 'credmatch'
      ? '/credmatch_logo.jpg'
      : '/credmatch_logo.jpg'
  const isMobile = useIsMobile()

  return isMobile ? <MobileNav logoSrc={logoSrc} /> : <DesktopNav logoSrc={logoSrc} />
}

export default Navigation
