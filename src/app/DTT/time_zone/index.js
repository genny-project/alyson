import { Button, ButtonGroup, HStack, Text, VStack } from '@chakra-ui/react'
import { Read } from 'app/DTT/text'
import { useState } from 'react'
import timeZone from 'utils/helpers/timezone_magic/time-zone-from-browser'
import PlacesAutocomplete from './places'

const Write = ({ questionCode, onSendAnswer, data }) => {
  const [confirm, setConfirm] = useState(null)

  console.log(data)
  return confirm === null ? (
    <VStack align="start">
      <HStack spacing="0" wrap="wrap">
        <Text>{`We've detected your timezone as`}</Text>
        <Text pl="1" pr="1">
          {data?.value || timeZone}
        </Text>
        <Text>{`is this correct?`}</Text>
      </HStack>
      <ButtonGroup>
        <Button
          colorScheme="primary"
          onClick={() => {
            onSendAnswer(timeZone)
            setConfirm(true)
          }}
        >
          Yes!
        </Button>
        <Button onClick={() => setConfirm(false)}>Nope</Button>
      </ButtonGroup>
    </VStack>
  ) : confirm ? (
    <Text>{`Thanks, your timezone is ${data?.value}`}</Text>
  ) : (
    <PlacesAutocomplete
      test-id={questionCode}
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
