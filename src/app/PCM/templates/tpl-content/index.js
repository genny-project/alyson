import PcmField from 'app/PCM/components/pcm-field'

const TemplateContent = ({ mappedPcm }) => {
  return <PcmField code={mappedPcm.PRI_LOC1} mappedPcm={mappedPcm} />
}

export default TemplateContent
