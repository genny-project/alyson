import PcmField from 'app/PCM/components/pcm-field'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { apiConfig } from 'config/get-api-config'

const TemplateProgressBar = ({ mappedPcm }) => {
  const { PRI_LOC1 } = mappedPcm
  console.log('AHH')
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
  const { clientId } = apiConfig
  const appName = convertToUppercase(clientId)

  const primaryColour =
    useSelector(selectCode('PRJ_' + appName, 'PRI_COLOR_SURFACE_ON'))?.valueString || '#FF0000'

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
    return <div style={{ width: width + 'px', backgroundColor: '#DEDEDE', height: '10px' }} />
  }
}

export default TemplateProgressBar
