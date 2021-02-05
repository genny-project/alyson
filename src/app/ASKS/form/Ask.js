import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { FormControl, FormLabel } from '@chakra-ui/react'
import getGroupCode from 'app/ASKS/utils/get-group-code'

import Text from 'app/DTT/text'
import Button from 'app/DTT/button'
import Radio from 'app/DTT/radio'

const ChildAsk = ({ parentCode, questionCode }) => {
  const data = useSelector(selectCode(parentCode, questionCode))

  const { attributeCode, targetCode, name, question } = data
  const dbAttribute = useSelector(selectCode(targetCode, attributeCode))
  const value = dbAttribute?.value
  const component = question.attribute.dataType.component
  const groupCode = getGroupCode(question)
  const onSendAnswer = createSendAnswer(data)

  const onBlur = e => {
    onSendAnswer(e.target.value)
  }

  console.log(data)

  return (
    <FormControl>
      <FormLabel>{name}</FormLabel>
      {component === 'radio' ? (
        <Radio.Write
          groupCode={groupCode}
          attributeCode={attributeCode}
          onSendAnswer={onSendAnswer}
          value={value}
        />
      ) : component === 'text' ? (
        <Text.Write label={name} onBlur={onBlur} />
      ) : component === 'button' ? (
        <Button name={name} onClick={() => console.log(questionCode)} />
      ) : (
        <div>{component}</div>
      )}
    </FormControl>
  )
}

export default ChildAsk
