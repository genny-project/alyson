import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import Text from 'app/DTT/text'
import Button from 'app/DTT/button'

const ChildAsk = ({ parentCode, questionCode }) => {
  const data = useSelector(selectCode(parentCode, questionCode))

  const { attributeCode, targetCode, name, question } = data
  const dbValue = useSelector(selectCode(targetCode, attributeCode))

  const component = question.attribute.dataType.component
  const onSendAnswer = createSendAnswer(data)

  const onBlur = e => {
    onSendAnswer(e.target.value)
  }

  return component === 'text' ? (
    <Text.Write label={name} onBlur={onBlur} />
  ) : component === 'button' ? (
    <Button name={name} onClick={() => console.log(questionCode)} />
  ) : (
    <div>{component}</div>
  )
}

export default ChildAsk
