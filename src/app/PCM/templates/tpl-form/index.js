import { Center, CircularProgress } from '@chakra-ui/react'
import Ask from 'app/ASKS/ask'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TemplateForm = ({ mappedPcm }) => {
  const { PRI_QUESTION_CODE } = mappedPcm

  if (PRI_QUESTION_CODE) {
    return (
      <Center>
        {/* This width is arbitrary and should probably be controlled by an attribute */}
        <div style={{ width: '80%' }}>
          <AskGroup questionCode={PRI_QUESTION_CODE} />
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

const FormAsk = ({ parentCode, questionCode }) => {
  const attributeCode = useSelector(selectCode(questionCode, 'attributeCode'))
  if (attributeCode === 'QQQ_QUESTION_GROUP') {
    return <AskGroup key={`${parentCode}-${questionCode}`} questionCode={questionCode} />
  } else {
    return (
      <Ask
        questionCode={questionCode}
        parentCode={parentCode}
        key={`${parentCode}-${questionCode}`}
      />
    )
  }
}

const AskGroup = ({ questionCode }) => {
  const childAsks = useSelector(selectCode(questionCode)) || []

  return (
    <div>
      {childAsks.map(code => (
        <FormAsk parentCode={questionCode} questionCode={code} />
      ))}
    </div>
  )
}

export default TemplateForm
