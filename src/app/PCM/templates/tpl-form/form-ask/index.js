import Ask from 'app/ASKS/ask'
import AskGroup from 'app/PCM/templates/tpl-form/ask-group'
import { equals } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const FormAsk = ({ parentCode, questionCode, level, properties, first = false, config }) => {
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
        config={config}
        parentCode={parentCode}
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
        config={config}
      />
    )
  }
}

export default FormAsk
