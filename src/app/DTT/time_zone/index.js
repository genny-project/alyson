import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlacesAutocomplete from './places'
import { Read } from 'app/DTT/text'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import timeZone from 'utils/helpers/timezone_magic/time-zone-from-browser'

const Write = ({ questionCode, onSendAnswer, data }) => {
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    if (!data?.value) {
      onSendAnswer(timeZone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return confirm === null ? (
    <VStack align="start">
      <HStack spacing="0" wrap="wrap">
        <Text>{`We've detected your timezone as`}</Text>
        <Text textStyle="body.1" pl="1" pr="1">
          {data?.value || timeZone}
        </Text>
      </HStack>
      <Button test-id={questionCode} onClick={() => setConfirm(false)}>
        Not right?
      </Button>
    </VStack>
  ) : confirm ? (
    data?.value ? (
      <HStack justifyContent={'space-between'}>
        <Text>{`Thanks, your timezone is ${data?.value}`}</Text>
        <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
      </HStack>
    ) : (
      <Text textStyle="body.error">
        {`Sorry, there is some issue we are working at the moment.`}
      </Text>
    )
  ) : (
    <PlacesAutocomplete
      questionCode={questionCode}
      onSelect={selection => {
        onSendAnswer(selection)
        setConfirm(true)
      }}
    />
  )
}

const TimeZonePicker = {
  Write,
  Read,
}

export default TimeZonePicker
