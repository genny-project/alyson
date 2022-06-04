import PcmField from 'app/PCM/components/pcm-field'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

/// This template should not be user specifc. We can likely make a TPL_TEXT or something similar to run this
const TemplateLojingHeader = ({ mappedPcm }) => {
  const { PRI_LOC1 } = mappedPcm

  return (
    <div>
      <PcmField
        code={PRI_LOC1}
        mappedPcm={mappedPcm}
        child={parameters => {
          return <Header fieldCode={parameters.fieldCode} sourceCode={parameters.ask?.sourceCode} />
        }}
      />
    </div>
  )
}

const Header = ({ fieldCode, sourceCode }) => {
  const data = useSelector(selectCode(sourceCode, fieldCode))?.valueString

  return (
    <>
      <div style={{ fontSize: 30, fontWeight: 'bold' }}>Hi {data}</div>
      Lojing.io Pre-Approval© means that once you’re approved, you can access any property within{' '}
      <br /> our platform without submitting the same details again.
      <br />
      <br />
      Thank you for starting the journey to your new home. A few easy steps and you’ll be on your{' '}
      <br /> way.
    </>
  )
}

export default TemplateLojingHeader
