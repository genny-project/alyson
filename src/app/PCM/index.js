import { Text, VStack } from '@chakra-ui/react'

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGetMappedPcm from 'app/PCM/helpers/get-mapped-pcm'
import templateHandlerMachine from 'app/PCM/templates'
import { isEmpty } from 'ramda'
import { maxRecursiveDepth } from 'utils/constants'
import debugOut from 'utils/debug-out'
import addOne from 'utils/helpers/add-one'

/**
 * Given a Pcm Code `code`, will attempt to render a PCM template based on
 * `PRI_TEMPLATE_CODE`, using the pcm stored at `code` in the redux store.
 */

const Pcm = ({ code, properties, depth, config, isSidebarCollapsed }) => {
  const depthPlusOne = addOne(depth)
  const mappedPcm = useGetMappedPcm(code)
  const { PRI_TEMPLATE_CODE: templateCode } = mappedPcm
  const parentCode = code
  const rest = { properties, config, isSidebarCollapsed }
  const template = templateHandlerMachine(depthPlusOne)(mappedPcm)(parentCode)(rest)

  if (!template) {
    debugOut.warn(
      `Falling back on default template for PCM: ${code} as template: ${templateCode} could not be found!`,
    )
    return null
  }

  if (isEmpty(mappedPcm) || !templateCode) {
    debugOut.warn(
      `PCM with code ${code} is empty! Rendering default template! It is possible that the PCM has not arrived yet, or a PCM with this code does not exist`,
    )
  }

  if (depth > maxRecursiveDepth) {
    return (
      <VStack>
        <FontAwesomeIcon color="red" icon={faExclamationTriangle} />
        <Text>{`Maxiumum Recursive Depth Exceeded!`}</Text>
      </VStack>
    )
  }

  return template
}

export default Pcm
