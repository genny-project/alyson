import PcmField from 'app/PCM/components/pcm-field'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'

const TemplateProgressBar = ({ mappedPcm }) => {
  const { PRI_LOC1 } = mappedPcm
  return (
    <div>
      <PcmField
        code={PRI_LOC1}
        mappedPcm={mappedPcm}
        child={parameters => {
          return (
            <ProgressBar fieldCode={parameters.fieldCode} sourceCode={parameters.ask.sourceCode} />
          )
        }}
      />
    </div>
  )
}

const ProgressBar = ({ fieldCode, sourceCode }) => {
  const primaryColour =
    useGetAttributeFromProjectBaseEntity('PRI_COLOR_SURFACE_ON')?.valueString || '#FF0000'

  const width = window.innerWidth * 0.6
  const data = useSelector(selectCode(sourceCode, fieldCode))?.valueDouble

  if (data) {
    const value = (data / 100) * width
    return (
      <div style={{ width: width + 'px', backgroundColor: 'lightgrey', height: '10px' }}>
        <div style={{ width: value + 'px', backgroundColor: primaryColour, height: '10px' }} />
      </div>
    )
  } else {
    return <div style={{ width: width + 'px', backgroundColor: '#EEEEEE', height: '10px' }} />
  }
}

export default TemplateProgressBar
