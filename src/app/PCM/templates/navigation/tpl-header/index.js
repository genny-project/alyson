import MobileNav from 'app/layouts/navigation/mobile'
import TemplateHeaderDesktop from './tpl-header-desktop'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'

const TemplateHeader = ({ mappedPcm }) => {
  const clientId = apiConfig?.clientId

  const logoSrc =
    clientId === 'internmatch'
      ? '/internmatch_new.png'
      : clientId === 'mentormatch'
      ? '/MM_Primary_Fullcolour-1.png'
      : clientId === 'lojing'
      ? '/lojing-logo.png'
      : clientId === 'credmatch'
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
