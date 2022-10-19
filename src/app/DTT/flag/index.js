import { Box, HStack, Switch, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { isNullOrUndefinedOrFalse } from 'utils/helpers/is-null-or-undefined'

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
  const [isChecked, setIsChecked] = useState(false)
  const clientId = apiConfig?.clientId
  const dataValue = data?.value

  const handleToggle = () => {
    onSendAnswer(isChecked ? 'false' : 'true')
    setIsChecked(isChecked => !isChecked)
  }

  useEffect(() => {
    !!dataValue && setIsChecked(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.value])

  return (
    <HStack spacing={5} justifyContent={'space-between'}>
      <Text color="gray.700">{label}</Text>
      <Box>
        <Switch
          colorScheme={equals(clientId)('lojing') ? 'orange' : 'primary'}
          test-id={questionCode}
          isChecked={isChecked}
          onChange={handleToggle}
        />
      </Box>
    </HStack>
  )
}
const Flag = {
  Write,
  Read,
}

export default Flag
