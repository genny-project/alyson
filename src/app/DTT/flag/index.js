import { HStack, Switch, Text } from '@chakra-ui/react'

import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

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

const Write = ({ questionCode, data, onSendAnswer, placeholderName: label }) => {
  const [isChecked, setIsChecked] = useState(!!data?.value)

  const handleToggle = () => {
    onSendAnswer(isChecked ? 'false' : 'true')
    setIsChecked(isChecked => !isChecked)
  }

  useEffect(() => {
    setIsChecked(data?.value)
  }, [data, setIsChecked])

  return (
    <HStack spacing={5}>
      <Text color="gray.700">{label}</Text>
      <Switch
        colorScheme="teal"
        test-id={questionCode}
        isChecked={isChecked}
        onChange={handleToggle}
      />
    </HStack>
  )
}
const Flag = {
  Write,
  Read,
}

export default Flag
