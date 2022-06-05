import ErrorBoundary from 'utils/developer/ErrorBoundary'
import { MetaTags } from 'react-meta-tags'
import { onSendMessage } from 'vertx'
import Pcm from 'app/PCM'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'

const Display = () => {
  window.onpopstate = event => {
    try {
      onSendMessage(event.state.state.data)
    } catch (err) {
      console.error(err)
    }
  }

  const projectTitle = useGetAttributeFromProjectBaseEntity('PRI_NAME')?.valueString
  const projectIcon = useGetAttributeFromProjectBaseEntity('PRI_FAVICON')?.valueString
  const rootPcmCode =
    useGetAttributeFromProjectBaseEntity('PRI_ROOT_PCM')?.valueString || 'PCM_ROOT'

  return (
    <ErrorBoundary>
      <MetaTags>
        <title>{projectTitle}</title>
        <link rel="icon" href={projectIcon} type="image/x-icon"></link>
      </MetaTags>
      <Pcm code={rootPcmCode} />
    </ErrorBoundary>
  )
}

export default Display
