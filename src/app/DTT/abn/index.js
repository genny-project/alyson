import { useState, useEffect } from 'react'
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Read } from '../text'
import ABNLookup from './abn_lookup'

const Write = ({ questionCode, data, onSendAnswer }) => {
  const [value, setValue] = useState(data?.value)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setValue(data?.value)
  }, [data])

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      <ABNLookup
        isOpen={isOpen}
        close={close}
        questionCode={questionCode}
        onSendAnswer={onSendAnswer}
      />
      <InputGroup>
        <InputLeftElement w="8rem">
          <Button w="8rem" variant="outline" colorScheme="primary" onClick={open}>
            ABN Lookup
          </Button>
        </InputLeftElement>
        <Input
          test-id={questionCode}
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
