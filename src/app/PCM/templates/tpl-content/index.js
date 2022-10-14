import PcmField from 'app/PCM/components/pcm-field'

/**
 * A straight passthrough template, can use this to prevent re-rendering large templates with lots of children
 */
const TemplateContent = ({ mappedPcm, depth, ...rest }) => {
  return (
    <>
      <PcmField code={mappedPcm.PRI_LOC1} mappedPcm={mappedPcm} properties={rest} depth={depth} />
    </>
  )
}

export default TemplateContent
