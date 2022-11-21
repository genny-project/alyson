import Ask from 'app/ASKS/ask'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { equals } from 'ramda'
import AskGroup from 'app/PCM/templates/tpl-form/ask-group'

const FormAsk = ({ parentCode, questionCode, level, properties, first = false }) => {
  const attributeCode = useSelector(selectCode(questionCode, 'attributeCode'))
  const targetCode = useSelector(selectCode(questionCode, 'targetCode'))

  if (equals(attributeCode)('QQQ_QUESTION_GROUP')) {
    return (
      <AskGroup
        key={`${parentCode}-${questionCode}`}
        questionCode={questionCode}
        level={level + 1}
        first={first}
        targetCode={targetCode}
        properties={properties}
      />
    )
  } else {
    return (
      <Ask
        questionCode={questionCode}
        parentCode={parentCode}
        key={`${parentCode}-${questionCode}`}
        passedTargetCode={targetCode}
        properties={properties}
      />
    )
  }
}

export default FormAsk
