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
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const ABNLookup = ({ isOpen, questionCode, close, onSendAnswer, targetCode }) => {
  const { callAbnLookup } = useApi()
  const sourceCode = useSelector(selectCode('USER'))
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const onChangeLookup = e => {
    callAbnLookup({
      onResult: setOptions,
      setLoading,
      value: e.target.value,
    })
  }

  const onSendLegalName = createSendAnswer({
    inferred: true,
    id: 201369,
    attributeCode: 'PRI_LEGAL_NAME',
    sourceCode,
    targetCode,
    weight: 1,
    code: 'QUE_LEGAL_NAME',
    identifier: 'QUE_LEGAL_NAME',
  })

  const onSendName = createSendAnswer({
    inferred: true,
    id: 201368,
    attributeCode: 'PRI_NAME',
    sourceCode,
    targetCode,
    weight: 1,
    code: 'QUE_TRADING_NAME',
    identifier: 'QUE_TRADING_NAME',
  })

  const onClick = opt => {
    close()
    onSendAnswer(opt.abn)
    onSendName(opt.name)
    onSendLegalName(opt.name)
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
                  colorScheme="primary"
                  h="4rem"
                  w="full"
                  variant="outline"
                  key={opt.abn}
                  onClick={() => onClick(opt)}
                >
                  <VStack m="1" cursor="pointer">
                    <Text>{opt.name}</Text>
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
