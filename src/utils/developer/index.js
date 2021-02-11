import { includes, slice, compose, filter } from 'ramda'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCode, selectKeys } from 'redux/db/selectors'
import { Text, Input, HStack, VStack, FormControl, FormLabel } from '@chakra-ui/react'

const DeveloperConsole = () => {
  const [code, setCode] = useState('')

  const keys = useSelector(selectKeys)
  const selection = useSelector(selectCode(code))

  const suggestions = code ? compose(slice(0, 20), filter(includes(code)))(keys) : []

  return (
    <HStack alignItems="start">
      <VStack>
        <FormControl>
          <FormLabel>Code</FormLabel>
          <Input value={code} onChange={e => setCode(e.target.value)} />
        </FormControl>
        {suggestions.map(sug => (
          <Text cursor="pointer" onClick={() => setCode(sug)}>
            {sug}
          </Text>
        ))}
      </VStack>
      <Text>{JSON.stringify(selection)}</Text>
    </HStack>
  )
}

export default DeveloperConsole
