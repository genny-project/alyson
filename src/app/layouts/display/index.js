import ErrorBoundary from 'utils/developer/ErrorBoundary'
import { MetaTags } from 'react-meta-tags'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { equals, find } from 'ramda'
import Pcm from 'app/PCM'

const Display = () => {
  let pcms = useSelector(selectCode(`PCMINFORMATION`)) || []

  window.onpopstate = event => {
    try {
      onSendMessage(event.state.state.data)
    } catch (err) {
      console.error(err)
    }
  }

  const appName = useSelector(selectCode('PROJECT'))
  const projectTitle = useSelector(selectCode(appName, 'PRI_NAME'))?.valueString
  const projectIcon = useSelector(selectCode(appName, 'PRI_FAVICON'))?.valueString

  // This should be determined by the Project base entity in the future
  const pcmRootCode = 'PCM_ROOT'
  const pcmRoot = find(equals(pcmRootCode))(pcms)

  return (
    <ErrorBoundary>
      <MetaTags>
        <title>{projectTitle}</title>
        <link rel="icon" href={projectIcon} type="image/x-icon"></link>
      </MetaTags>
      <Pcm code={pcmRoot} />
    </ErrorBoundary>
  )
}

export default Display
