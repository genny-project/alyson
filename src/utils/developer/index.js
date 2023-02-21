import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { compose, filter, includes, length, slice, sortBy, toUpper } from 'ramda'
import { selectCode, selectKeys } from 'redux/db/selectors'
import { useRef, useState } from 'react'

import { useSelector } from 'react-redux'

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
      <Button size="xs" onClick={onOpen} position="fixed" bottom="0" left="0" zIndex={10000}>
        db search
      </Button>

      <Drawer
        initialFocusRef={firstField}
        placement="bottom"
        size="full"
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay zIndex={100000}>
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
                      key={sug}
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
                        {selection.map((key, index) =>
                          typeof key === 'object' ? (
                            Object.keys(key).map(key_2 => (
                              <Text
                                borderRadius="lg"
                                p="1"
                                _hover={{ bg: 'grey' }}
                                cursor="pointer"
                                onClick={() => setCode(key)}
                                key={key[key_2]}
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
                              key={index}
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
                            <HStack key={key}>
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
  process.env.NODE_ENV === 'development' ||
  localStorage.getItem('useDev') === 'true' ||
  (window &&
    (window.location.hostname.indexOf('dev') !== -1 ||
      window.location.hostname.indexOf('staging') !== -1))
