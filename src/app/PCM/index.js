import TemplateDefault from './templates/tpl-default'
import debugOut from 'utils/debug-out'
import { isEmpty } from 'ramda'
import templateHandlerMachine from 'app/PCM/templates'
import useGetMappedPcm from './helpers/get-mapped-pcm'

/**
 * Given a Pcm Code `code`, will attempt to render a PCM template based on
 * `PRI_TEMPLATE_CODE`, using the pcm stored at `code` in the redux store.
 */

const Pcm = ({ code, properties, depth }) => {
  const mappedPcm = useGetMappedPcm(code)
  const { PRI_TEMPLATE_CODE } = mappedPcm
  const template = templateHandlerMachine(mappedPcm)(PRI_TEMPLATE_CODE)(properties)(depth + 1)

  if (isEmpty(mappedPcm) || !PRI_TEMPLATE_CODE || !template) {
    if (!template) {
      debugOut.warn(
        `Falling back on default template for PCM: ${code} as template: ${PRI_TEMPLATE_CODE} could not be found!`,
      )
    }
    if (isEmpty(mappedPcm) || !PRI_TEMPLATE_CODE) {
      debugOut.warn(
        `PCM with code ${code} is empty! Rendering default template! It is possible that the PCM has not arrived yet, or a PCM with this code does not exist`,
      )
    }
    return <TemplateDefault {...properties} />
  }

  return template
}

export default Pcm
