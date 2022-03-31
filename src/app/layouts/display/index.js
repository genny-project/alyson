import ErrorBoundary from 'utils/developer/ErrorBoundary'
import { MetaTags } from 'react-meta-tags'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import Pcms from '../pcms'

const Display = ({ title }) => {
  window.onpopstate = event => {
    try {
      onSendMessage(event.state.state.data)
    } catch (err) {
      console.error(err)
    }
  }

  const appName = convertToUppercase(title)

  const projectTitle = useSelector(selectCode('PRJ_' + appName, 'PRI_NAME'))?.valueString
  const projectIcon = useSelector(selectCode('PRJ_' + appName, 'PRI_FAVICON'))?.valueString

  return (
    <ErrorBoundary>
      <MetaTags>
        <title>{projectTitle}</title>
        <link rel="icon" href={projectIcon} type="image/x-icon"></link>
      </MetaTags>
      <Pcms code="PCM_ROOT" />
    </ErrorBoundary>
  )
}

export default Display
