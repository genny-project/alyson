import debugOut from 'utils/debug-out'
import { isEmpty } from 'ramda'
import templateHandlerMachine from 'app/PCM/templates'
import useGetMappedPcm from './helpers/get-mapped-pcm'
import addOne from 'utils/helpers/add-one'

/**
 * Given a Pcm Code `code`, will attempt to render a PCM template based on
 * `PRI_TEMPLATE_CODE`, using the pcm stored at `code` in the redux store.
 */

const Pcm = ({ code, properties, depth }) => {
  const depthPlusOne = addOne(depth)
  const mappedPcm = useGetMappedPcm(code)
  const { PRI_TEMPLATE_CODE: templateCode } = mappedPcm
  const template = templateHandlerMachine(depthPlusOne)(mappedPcm)(templateCode)(properties)

  if (!template) {
    debugOut.warn(
      `Falling back on default template for PCM: ${code} as template: ${templateCode} could not be found!`,
    )
  }

  if (isEmpty(mappedPcm) || !templateCode) {
    debugOut.warn(
      `PCM with code ${code} is empty! Rendering default template! It is possible that the PCM has not arrived yet, or a PCM with this code does not exist`,
    )
  }

  return template
}

export default Pcm
