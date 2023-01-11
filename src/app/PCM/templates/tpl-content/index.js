import PcmField from 'app/PCM/components/pcm-field'
import TemplateDefault from 'app/PCM/templates/tpl-default'
import debugOut from 'utils/debug-out'

/**
 * A straight passthrough template, can use this to prevent re-rendering large templates with lots of children
 */
const TemplateContent = ({ mappedPcm, depth, parentCode, ...rest }) => {
  const { PRI_LOC1 } = mappedPcm || {}
  if (!PRI_LOC1) {
    debugOut.warn(`PRI_LOC1 is missing from the list of BaseEntity Attributes for ${parentCode}`)
    return <TemplateDefault />
  }

  return <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} properties={rest} depth={depth} />
}

export default TemplateContent
