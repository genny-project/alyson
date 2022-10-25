import FormAsk from 'app/PCM/templates/tpl-form/form-ask'

const QuestionEvents = ({ mappedPcm }) => {
  let { PRI_QUESTION_CODE: questionCode } = mappedPcm
  return <FormAsk questionCode={questionCode} parentCode={questionCode} level={0} />
}

export default QuestionEvents
