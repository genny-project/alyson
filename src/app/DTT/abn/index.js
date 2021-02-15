import useApi from 'api'
import { useState, useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Input,
  Text,
  VStack,
  CircularProgress,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { Read } from '../text'

const Write = ({ data, onSendAnswer }) => {
  const { callAbnLookup } = useApi()

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(data?.value)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const onChangeLookup = e => {
    callAbnLookup({
      onResult: setOptions,
      setLoading,
      value: e.target.value,
    })
  }

  useEffect(() => {
    setValue(data?.value)
  }, [data])

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      <Popover isOpen={isOpen} onClose={close}>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Search For Name</PopoverHeader>
          <PopoverBody>
            <Input onChange={onChangeLookup} />
            {loading ? (
              <CircularProgress mt="5" isIndeterminate />
            ) : (
              <VStack mt="5">
                {options.map(opt => (
                  <Button
                    colorScheme="teal"
                    h="4rem"
                    w="full"
                    variant="outline"
                    fontWeight="normal"
                    key={opt.abn}
                    onClick={() => {
                      close()
                      onSendAnswer(opt.abn)
                    }}
                  >
                    <VStack m="1" cursor="pointer">
                      <Text fontWeight="semibold">{opt.name}</Text>
                      <Text>{`${opt.state} - ${opt.postcode}, ABN ${opt.abn}`}</Text>
                    </VStack>
                  </Button>
                ))}
              </VStack>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <InputGroup>
        <InputLeftElement w="8rem">
          <Button w="8rem" variant="outline" colorScheme="blue" onClick={open}>
            ABN Lookup
          </Button>
        </InputLeftElement>
        <Input
          pl="10rem"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={e => onSendAnswer(e.target.value)}
        />
      </InputGroup>
    </>
  )
}

const ABN = {
  Write,
  Read,
}

export default ABN
