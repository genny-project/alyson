import ProcessSearchDefaultView from './DefaultView'
import ProcessSearchMobileView from './MobileView'
import { useIsMobile } from 'utils/hooks'

const ProcessSearch = ({ sourceCode, targetCode, pcmCode }) => {
  const isMobile = useIsMobile()

  return isMobile ? (
    <ProcessSearchMobileView pcmCode={pcmCode} sourceCode={sourceCode} targetCode={targetCode} />
  ) : (
    <ProcessSearchDefaultView pcmCode={pcmCode} sourceCode={sourceCode} targetCode={targetCode} />
  )
}

export default ProcessSearch
