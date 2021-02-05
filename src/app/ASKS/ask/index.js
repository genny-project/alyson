import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { FormControl, FormLabel } from '@chakra-ui/react'
import getGroupCode from 'app/ASKS/utils/get-group-code'

import Text from 'app/DTT/text'
import Button from 'app/DTT/button'
import Radio from 'app/DTT/radio'
import Select from 'app/DTT/select'

const Ask = ({ parentCode, questionCode }) => {
  const askData = useSelector(selectCode(parentCode, questionCode))

  const { attributeCode, targetCode, name, question } = askData

  const data = useSelector(selectCode(targetCode, attributeCode))

  const component = question.attribute.dataType.component
  const groupCode = getGroupCode(question)
  const description = question.attribute.description

  const onSendAnswer = createSendAnswer(askData)

  return component === 'button' ? (
    <Button name={name} onClick={() => console.log(questionCode)} />
  ) : (
    <FormControl>
      <FormLabel>{name}</FormLabel>
      {component === 'dropdown' ? (
        <Select.Write
          groupCode={groupCode}
          attributeCode={attributeCode}
          onSendAnswer={onSendAnswer}
          placeholder={description}
        />
      ) : component === 'radio' ? (
        <Radio.Write
          groupCode={groupCode}
          attributeCode={attributeCode}
          onSendAnswer={onSendAnswer}
          data={data}
        />
      ) : component === 'text' ? (
        <Text.Write label={name} onSendAnswer={onSendAnswer} />
      ) : (
        <div>{component}</div>
      )}
    </FormControl>
  )
}

export default Ask
