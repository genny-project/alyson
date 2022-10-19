import ErrorBoundary from 'utils/developer/ErrorBoundary'
import { MetaTags } from 'react-meta-tags'
import { onSendMessage } from 'vertx'
import Pcm from 'app/PCM'
import { useGetProjectInformation } from 'app/BE/project-be'

const Display = () => {
  window.onpopstate = event => {
    try {
      onSendMessage(event.state.state.data)
    } catch (err) {
      console.error(err)
    }
  }

  const { attributeObject: nameAttributeObject } = useGetProjectInformation('PRI_NAME')
  const projectTitle = nameAttributeObject?.valueString

  const { attributeObject: iconAttributeObject } = useGetProjectInformation('PRI_FAVICON')
  const projectIcon = iconAttributeObject?.valueString

  const { attributeObject: rootObject } = useGetProjectInformation('PRI_ROOT_PCM')
  const rootPcmCode = rootObject?.valueString || 'PCM_ROOT'

  return (
    <ErrorBoundary>
      <MetaTags>
        <title>{projectTitle}</title>
        <link rel="icon" href={projectIcon} type="image/x-icon"></link>
      </MetaTags>
      <Pcm code={rootPcmCode} depth={0} />
    </ErrorBoundary>
  )
}

export default Display
