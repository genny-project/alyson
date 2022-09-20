import { Button, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import debounce from 'lodash.debounce'

const Write = ({ questionCode, onSendAnswer }) => {
  const [status, setStatus] = useState(null)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const debouncedSendAnswer = debounce(onSendAnswer, 500)

  const handleApproved = () => {
    setStatus('Approved')
    dispatchFieldMessage({ payload: questionCode })
  }

  const handleRejected = () => {
    setStatus('Rejected')
    dispatchFieldMessage({ payload: questionCode })
  }

  useEffect(() => {
    debouncedSendAnswer(status)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <HStack>
      <Button
        onClick={handleApproved}
        colorScheme="teal"
        variant={status === 'Approved' ? 'solid' : 'outline'}
      >
        APPROVED
      </Button>
      <Button
        onClick={handleRejected}
        colorScheme="red"
        variant={status === 'Rejected' ? 'solid' : 'outline'}
      >
        REJECTED
      </Button>
    </HStack>
  )
}

const Read = ({ data }) => {
  const isApproved = data?.value
  return (
    <HStack>
      <Button colorScheme="teal" variant={isApproved === 'Approved' ? 'solid' : 'outline'}>
        APPROVED
      </Button>
      <Button colorScheme="red" variant={isApproved === 'Rejected' ? 'solid' : 'outline'}>
        REJECTED
      </Button>
    </HStack>
  )
}

const Toggle = {
  Write,
  Read,
}

export default Toggle
