import { CircularProgress, Center } from '@chakra-ui/react'
import useGetMappedPcm from './helpers/get-mapped-pcm'
import isNotEmpty from 'utils/helpers/is-not-empty'
import templateHandlerMachine from 'app/PCM/templates'
import TemplateDefault from './templates/tpl-default'
import { assoc, forEach, keys } from 'ramda'

const Pcm = ({ code, properties, ...props }) => {
  let mappedPcm = useGetMappedPcm(code)

  const { PRI_TEMPLATE_CODE: templateCode } = mappedPcm

  if (isNotEmpty(mappedPcm)) {
    if (props.locOverride) {
      forEach(x => {
        mappedPcm = assoc(x, props.locOverride[x], mappedPcm)
      })(keys(props.locOverride))
    }

    if (templateCode) {
      properties = assoc('mappedPcm', mappedPcm, properties)
      return templateHandlerMachine(templateCode)(properties)
    } else {
      return (
        <Center>
          <CircularProgress mt="5" isIndeterminate />
        </Center>
      )
    }
  }
  console.error('Falling back on default template for PCM: ' + code + '!')
  return <TemplateDefault {...properties} />
}

export default Pcm
