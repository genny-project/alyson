import { inc } from 'ramda'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLastReceived, selectLastSent } from 'redux/app/selectors'
import {
  Alert,
  AlertTitle,
  AlertDescription,
  VStack,
  HStack,
  ModalOverlay,
  Modal,
  ModalContent,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Timeout = () => {
  const timerRef = useRef()
  const lastSent = useSelector(selectLastSent)
  const lastReceived = useSelector(selectLastReceived)

  const [timeSinceLastSent, setTimeSinceLastSent] = useState(0)

  const countUp = useCallback(() => timeSinceLastSent !== null && setTimeSinceLastSent(inc), [
    timeSinceLastSent,
  ])

  useEffect(() => {
    timerRef.current = setInterval(countUp, 1000)
    return () => clearInterval(timerRef.current)
  }, [countUp])

  useEffect(() => {
    if (lastSent) setTimeSinceLastSent(0)
  }, [lastSent])

  useEffect(() => {
    if (lastReceived) setTimeSinceLastSent(null)
  }, [lastReceived])

  return (
    <Modal isCentered isOpen={timeSinceLastSent !== null && timeSinceLastSent >= 10}>
      <ModalOverlay />
      <ModalContent>
        <Alert borderRadius="md" p="5" status="error">
          <VStack align="start">
            <HStack>
              <FontAwesomeIcon size="2x" color="red" icon={faExclamationCircle} />
              <AlertTitle>{`Our server stopped responding`}</AlertTitle>
            </HStack>
            <AlertDescription>{`Sorry, our server seems to not be responding. Please try reloading the page or come back later. Thanks!`}</AlertDescription>
          </VStack>
        </Alert>
      </ModalContent>
    </Modal>
  )
}

export default Timeout
