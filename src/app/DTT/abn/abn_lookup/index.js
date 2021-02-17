import { useState } from 'react'
import useApi from 'api'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Button,
  Input,
  Text,
  VStack,
  CircularProgress,
  InputGroup,
} from '@chakra-ui/react'

const ABNLookup = ({ isOpen, questionCode, close, onSendAnswer }) => {
  const { callAbnLookup } = useApi()

  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const onChangeLookup = e => {
    callAbnLookup({
      onResult: setOptions,
      setLoading,
      value: e.target.value,
    })
  }

  return (
    <Popover isOpen={isOpen} onClose={close}>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Search For Name</PopoverHeader>
        <PopoverBody>
          <InputGroup>
            <Input test-id={`${questionCode}-abn-lookup`} onChange={onChangeLookup} />
          </InputGroup>
          {loading ? (
            <CircularProgress mt="5" isIndeterminate />
          ) : (
            <VStack mt="5">
              {options.map(opt => (
                <Button
                  test-id={opt.abn}
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
  )
}

export default ABNLookup
