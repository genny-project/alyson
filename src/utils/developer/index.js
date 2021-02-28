import { includes, slice, compose, filter } from 'ramda'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCode, selectKeys } from 'redux/db/selectors'
import {
  Button,
  Text,
  Input,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react'

const DeveloperConsole = () => {
  const { isOpen, onToggle } = useDisclosure()

  const [code, setCode] = useState('')

  const keys = useSelector(selectKeys)
  const selection = useSelector(selectCode(code))

  const suggestions = code ? compose(slice(0, 20), filter(includes(code)))(keys) : []

  return (
    <div>
      <Button onClick={onToggle}>redux search</Button>
      <Collapse in={isOpen}>
        <HStack alignItems="start" m="10">
          <VStack alignItems="left">
            <FormControl w="20rem">
              <FormLabel>Code</FormLabel>
              <Input value={code} onChange={e => setCode(e.target.value)} />
            </FormControl>
            {suggestions.map(sug => (
              <Text cursor="pointer" onClick={() => setCode(sug)}>
                {sug}
              </Text>
            ))}
          </VStack>
          <VStack>
            {selection ? (
              selection.map ? (
                selection.map(key => (
                  <Text cursor="pointer" onClick={() => setCode(key)}>
                    {key}
                  </Text>
                ))
              ) : (
                <Text>{JSON.stringify(selection)}</Text>
              )
            ) : (
              <div />
            )}
          </VStack>
        </HStack>
      </Collapse>
    </div>
  )
}

export default DeveloperConsole

export const isDev = process.env.NODE_ENV === 'development' || localStorage.getItem('useDev')
