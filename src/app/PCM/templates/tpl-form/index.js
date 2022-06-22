import { Center, CircularProgress } from '@chakra-ui/react'
import Ask from 'app/ASKS/ask'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TemplateForm = ({ mappedPcm }) => {
  const { PRI_QUESTION_CODE } = mappedPcm
  const childAsks = useSelector(selectCode(PRI_QUESTION_CODE)) || []
  if (PRI_QUESTION_CODE) {
    return (
      <Center>
        <div style={{ width: '80%' }}>
          {childAsks.map(code => (
            <Ask
              questionCode={code}
              parentCode={PRI_QUESTION_CODE}
              key={`${code}-${PRI_QUESTION_CODE}`}
            />
          ))}
        </div>
      </Center>
    )
  } else {
    console.error('Attempting to display a TPL_FORM for a PCM without a question code!')
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    )
  }
}

export default TemplateForm
