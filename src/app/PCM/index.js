import { CircularProgress, Center } from '@chakra-ui/react'
import isNotEmpty from 'utils/helpers/is-not-empty'
import templateHandlerMachine from 'app/PCM/templates'
import TemplateDefault from './templates/tpl-default'
import useGetMappedPcm from './helpers/get-mapped-pcm'

const Pcm = ({ code, properties }) => {
  const mappedPcm = useGetMappedPcm(code)

  /// By making mapped PCM selected here, and using it as a prop, this causes rerenders
  return <MappedPcm code={code} mappedPcm={mappedPcm} properties={properties} />
}

const MappedPcm = ({ code, mappedPcm, properties }) => {
  const { PRI_TEMPLATE_CODE: templateCode } = mappedPcm

  if (isNotEmpty(mappedPcm)) {
    const template = templateHandlerMachine(mappedPcm)(templateCode)(properties)
    if (templateCode) {
      return template
    } else if (templateCode && !template) {
      console.error(
        `Falling back on default template for PCM: ${code} as template: ${templateCode} could not be found!`,
      )
      return <TemplateDefault {...properties} />
    } else {
      console.error(`PCM ${code} doesn't have a template code!`)
      return (
        <Center>
          <CircularProgress mt="5" isIndeterminate />
        </Center>
      )
    }
  } else {
    console.error(`PCM with code ${code} is empty! Rendering default template!`)
    return <TemplateDefault {...properties} />
  }
}

export default Pcm
