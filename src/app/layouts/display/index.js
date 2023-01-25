import ErrorBoundary from 'utils/developer/ErrorBoundary'
import Pcm from 'app/PCM'
import { onSendMessage } from 'vertx'
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

  const usePageMeta = title => {
    const defaultTitle = 'Alyson'
    document.title = title || defaultTitle

    const favIconMeta = document.querySelector("link[rel='icon']")
    favIconMeta.setAttribute('href', projectIcon, 'type', 'image/x-icon')
  }

  const { attributeObject: rootObject } = useGetProjectInformation('PRI_ROOT_PCM')
  const rootPcmCode = rootObject?.valueString || 'PCM_ROOT'

  return (
    <ErrorBoundary>
      {usePageMeta(projectTitle)}
      <Pcm code={rootPcmCode} depth={0} />
    </ErrorBoundary>
  )
}

export default Display
