import { CircularProgress, Center } from '@chakra-ui/react'
import isNotEmpty from 'utils/helpers/is-not-empty'
import templateHandlerMachine from 'app/PCM/templates'
import TemplateDefault from './templates/tpl-default'
import { reduce } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Pcm = ({ code, properties }) => {
  const pcm = useSelector(selectCode(code, 'allAttributes'), (left, right) => left === right)

  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(pcm || [])

  /// By making mapped PCM selected here, and using it as a prop, this causes rerenders
  return <MappedPcm code={code} mappedPcm={mappedPcm} properties={properties} />
}

const MappedPcm = ({ code, mappedPcm, properties }) => {
  const { PRI_TEMPLATE_CODE: templateCode } = mappedPcm

  if (isNotEmpty(mappedPcm)) {
    if (templateCode) {
      const template = templateHandlerMachine(templateCode)(properties)(mappedPcm)

      if (!template) {
        console.error(
          'Falling back on default template for PCM: ' +
            code +
            ' as template: ' +
            templateCode +
            ' could not be found!',
        )
        return <TemplateDefault {...properties} />
      }

      return template
    } else {
      return (
        <Center>
          <CircularProgress mt="5" isIndeterminate />
        </Center>
      )
    }
  }

  console.error('PCM with code ' + code + ' is empty! Rendering default template!')
  return <TemplateDefault {...properties} />
}

export default Pcm
