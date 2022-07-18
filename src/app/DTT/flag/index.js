import { useState } from 'react'
import { Switch } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const Read = ({ data = {} }) => {
  const sourceCode = useSelector(selectCode('USER'))

  const toggle = () =>
    onSendMessage({
      code: `ACT_${data.attributeCode}`,
      sourceCode,
      targetCode: data.baseEntityCode,
    })
  return <Switch isChecked={data.value} onChange={toggle} />
}

const Write = ({ questionCode, data, onSendAnswer }) => {
  const [isChecked, setIsChecked] = useState(!!data?.value)

  const handleToggle = () => {
    onSendAnswer(isChecked ? 'false' : 'true')
    setIsChecked(isChecked => !isChecked)
  }

  return <Switch test-id={questionCode} isChecked={isChecked} onChange={handleToggle} />
}
const Flag = {
  Write,
  Read,
}

export default Flag
