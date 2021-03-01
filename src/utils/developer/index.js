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
    <VStack m="10">
      <Button size="xs" onClick={onToggle}>
        db search
      </Button>
      <Collapse in={isOpen}>
        <VStack alignItems="left">
          <FormControl w="40rem">
            <FormLabel>Code</FormLabel>
            <Input autoFocus value={code} onChange={e => setCode(e.target.value)} />
          </FormControl>
        </VStack>
        <HStack alignItems="start">
          <VStack alignItems="left" w="40rem">
            {suggestions.map(sug => (
              <Text
                fontFamily="mono"
                borderRadius="lg"
                p="1"
                _hover={{ bg: 'grey' }}
                cursor="pointer"
                onClick={() => setCode(sug)}
              >
                {sug}
              </Text>
            ))}
          </VStack>
          <VStack alignItems="left" w="40rem">
            {selection ? (
              selection.map ? (
                <>
                  <Text size="lg" fontWeight="bold">
                    Has Keys
                  </Text>
                  {selection.map(key => (
                    <Text
                      borderRadius="lg"
                      p="1"
                      _hover={{ bg: 'grey' }}
                      cursor="pointer"
                      onClick={() => setCode(key)}
                    >
                      {key}
                    </Text>
                  ))}
                </>
              ) : (
                <>
                  <Text size="lg" fontWeight="bold">
                    Has VALUE
                  </Text>
                  <Text>{JSON.stringify(selection)}</Text>
                </>
              )
            ) : (
              <div />
            )}
          </VStack>
        </HStack>
      </Collapse>
    </VStack>
  )
}

export default DeveloperConsole

export const isDev = process.env.NODE_ENV === 'development' || localStorage.getItem('useDev')
