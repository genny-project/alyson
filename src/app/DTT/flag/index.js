import { Box, HStack, Switch, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { isNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'

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

const Write = ({ questionCode, data, onSendAnswer, placeholderName: label, mandatory }) => {
  const [isChecked, setIsChecked] = useState(false)
  const clientId = apiConfig?.clientId
  const handleToggle = () => {
    onSendAnswer(`${!isChecked}`)
    setIsChecked(isChecked => !isChecked)
  }

  useEffect(() => {
    if (isNullOrUndefinedOrEmpty(data?.value)) {
      setIsChecked(false)
      onSendAnswer(false)
    } else {
      setIsChecked(data?.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.value])

  return (
    <HStack spacing={5} justifyContent={'space-between'}>
      <HStack>
        <Text color="gray.700">{label}</Text>
        {mandatory ? (
          <Text as="span" color={'red.500'} ml={1}>
            *
          </Text>
        ) : (
          <></>
        )}
      </HStack>

      <Box>
        <Switch
          colorScheme={equals(clientId)('lojing') ? 'orange' : 'primary'}
          test-id={questionCode}
          onChange={handleToggle}
          value={isChecked}
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
