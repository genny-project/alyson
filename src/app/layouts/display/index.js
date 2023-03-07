import { toUpper } from 'ramda'

import { useGetProjectInformation } from 'app/BE/project-be'
import Pcm from 'app/PCM'
import { useEffect } from 'react'
import ErrorBoundary from 'utils/developer/ErrorBoundary'
import { onSendMessage } from 'vertx'

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

  const usePageMeta = (title, icon) => {
    const defaultTitle = 'Alyson'
    const defaultIcon = ''

    useEffect(() => {
      document.title = toUpper(title || defaultTitle)
      let favIconURL = document.querySelector("link[rel~='icon]")
      if (!favIconURL) {
        favIconURL = document.createElement('link')
        favIconURL.rel = 'icon'
        document.getElementsByTagName('head')[0].appendChild(favIconURL)
      }
      favIconURL.href = defaultIcon || `/${title}-favicon.png` || icon
    }, [defaultTitle, title, icon])
  }
  return (
    <ErrorBoundary>
      {usePageMeta(projectTitle, projectIcon)}
      <Pcm code={rootPcmCode} depth={0} />
    </ErrorBoundary>
  )
}

export default Display
