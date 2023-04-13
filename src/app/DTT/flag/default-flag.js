import { Box, HStack, Switch, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { isNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'

const DefaultFlag = ({ questionCode, data, onSendAnswer, placeholderName: label, mandatory }) => {
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

export default DefaultFlag
