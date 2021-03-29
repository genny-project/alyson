import { includes, slice, compose, filter, length, sortBy, toUpper } from 'ramda'
import { useState, useRef } from 'react'
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
  useDisclosure,
} from '@chakra-ui/react'

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
} from '@chakra-ui/react'

const DeveloperConsole = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()

  const [code, setCode] = useState('')

  const keys = useSelector(selectKeys)
  const selection = useSelector(selectCode(code))

  const suggestions = code
    ? compose(slice(0, 20), sortBy(length), filter(includes(code)))(keys)
    : []

  return (
    <VStack>
      <Button
        size="xs"
        onClick={() => {
          localStorage.removeItem('useDev')
        }}
      >
        turn off dev mode
      </Button>
      <Button size="xs" onClick={onOpen}>
        db search
      </Button>

      <Drawer
        initialFocusRef={firstField}
        placement="bottom"
        size="full"
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <FormControl w="40rem">
                <FormLabel>Code</FormLabel>
                <Input
                  ref={firstField}
                  value={code}
                  onChange={e => setCode(toUpper(e.target.value))}
                />
              </FormControl>
            </DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
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
                        <Text size="lg">Has Keys</Text>
                        {selection.map(key =>
                          console.log(key) || typeof key === 'object' ? (
                            Object.keys(key).map(key_2 => (
                              <Text
                                borderRadius="lg"
                                p="1"
                                _hover={{ bg: 'grey' }}
                                cursor="pointer"
                                onClick={() => setCode(key)}
                              >
                                {`${key[key_2]}`}
                              </Text>
                            ))
                          ) : (
                            <Text
                              borderRadius="lg"
                              p="1"
                              _hover={{ bg: 'grey' }}
                              cursor="pointer"
                              onClick={() => setCode(key)}
                            >
                              {`${key}`}
                            </Text>
                          ),
                        )}
                      </>
                    ) : (
                      <>
                        <Text size="lg">Has VALUE</Text>

                        {typeof selection === 'object' ? (
                          Object.keys(selection).map(key => (
                            <HStack>
                              <Text w="15rem">{key}</Text>
                              <Text>{`${selection[key]}`}</Text>
                            </HStack>
                          ))
                        ) : (
                          <Text>{`${selection}`}</Text>
                        )}
                      </>
                    )
                  ) : (
                    <div />
                  )}
                </VStack>
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </VStack>
  )
}

export default DeveloperConsole

export const isDev =
  process.env.NODE_ENV === 'development' || localStorage.getItem('useDev') === 'true'
