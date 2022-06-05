import templateHandlerMachine from 'app/PCM/templates'
import TemplateDefault from './templates/tpl-default'
import useGetMappedPcm from './helpers/get-mapped-pcm'
import { isEmpty } from 'ramda'

/**
 * Given a Pcm Code `code`, will attempt to render a PCM template based on
 * `PRI_TEMPLATE_CODE`, using the pcm stored at `code` in the redux store.
 */
const Pcm = ({ code, properties }) => {
  const mappedPcm = useGetMappedPcm(code)

  /// By making mapped PCM selected here, and using it as a prop, this causes rerenders
  return <MappedPcm code={code} mappedPcm={mappedPcm} properties={properties} />
}

const MappedPcm = ({ code, mappedPcm, properties }) => {
  /// Make sure the mapped PCM actually has data in it
  if (isEmpty(mappedPcm)) {
    console.error(
      `PCM with code ${code} is empty! Rendering default template! It is possible that the PCM has not arrived yet, or a PCM with this code does not exist`,
    )
    return <TemplateDefault {...properties} />
  }

  const { PRI_TEMPLATE_CODE } = mappedPcm

  /// Make sure the PCM actually has a template code
  if (!PRI_TEMPLATE_CODE) {
    console.error(
      `PCM ${code} doesn't have PRI_TEMPLATE_CODE set! Falling back on default template!`,
    )
    return <TemplateDefault {...properties} />
  }

  /// Retreive the template from the mapped Pcm, now that we know that there is definitly a template code
  const template = templateHandlerMachine(mappedPcm)(PRI_TEMPLATE_CODE)(properties)

  /// This shouldn't return undefined, as templateHandlerMachine returns the default template on error, but if somehow it does, render the default template.
  if (!template) {
    console.error(
      `Falling back on default template for PCM: ${code} as template: ${PRI_TEMPLATE_CODE} could not be found!`,
    )
    return <TemplateDefault {...properties} />
  }

  /// If all is succesful return the template
  return template
}

export default Pcm
