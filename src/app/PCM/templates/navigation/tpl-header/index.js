import TemplateHeaderDesktop from './tpl-header-desktop'
import { apiConfig } from 'config/get-api-config'
import { useIsMobile } from 'utils/hooks'
import TemplateHeaderMobile from './tpl-header-mobile'

const TemplateHeader = ({ mappedPcm, depth }) => {
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
    <TemplateHeaderMobile mappedPcm={mappedPcm} logoSrc={logoSrc} depth={depth} />
  ) : (
    <TemplateHeaderDesktop mappedPcm={mappedPcm} logoSrc={logoSrc} depth={depth} />
  )
}

export default TemplateHeader
