import ProcessSearchDefaultView from './DefaultView'
import ProcessSearchMobileView from './MobileView'
import { useIsMobile } from 'utils/hooks'

const ProcessSearch = () => {
  const isMobile = useIsMobile()

  return isMobile ? <ProcessSearchMobileView /> : <ProcessSearchDefaultView />
}

export default ProcessSearch
