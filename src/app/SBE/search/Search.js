import ProcessSearchDefaultView from './DefaultView'
import ProcessSearchMobileView from './MobileView'
import { useIsMobile } from 'utils/hooks'

const ProcessSearch = ({ sourceCode, targetCode }) => {
  const isMobile = useIsMobile()

  return isMobile ? (
    <ProcessSearchMobileView sourceCode={sourceCode} targetCode={targetCode} />
  ) : (
    <ProcessSearchDefaultView sourceCode={sourceCode} targetCode={targetCode} />
  )
}

export default ProcessSearch
