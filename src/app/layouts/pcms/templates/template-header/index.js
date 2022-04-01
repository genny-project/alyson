import MobileNav from 'app/layouts/navigation/mobile'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'
import TemplateHeaderDesktop from './template-header-desktop'

const TemplateHeader = ({ mappedPcm }) => {
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

  return isMobile ? (
    <MobileNav logoSrc={logoSrc} />
  ) : (
    <TemplateHeaderDesktop mappedPcm={mappedPcm} logoSrc={logoSrc} />
  )
}

export default TemplateHeader
