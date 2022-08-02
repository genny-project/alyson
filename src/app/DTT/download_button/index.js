import { Box, Button, VStack, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const DownloadButton = ({ urlLink = 'https://internmatch.io/' }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  const onClick = () => window.open(urlLink)

  if (transcript === 'download video') {
    onClick()
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }
  return (
    <Box>
      <VStack>
        <Button
          onClick={onClick}
          leftIcon={<FontAwesomeIcon icon={faDownload} />}
          colorScheme="primary"
          variant="solid"
        >
          {`Download`}
        </Button>
        <Button onClick={SpeechRecognition.startListening}>{`👂🏼`}</Button>
        <Button onClick={SpeechRecognition.stopListening}>{`🙉`}</Button>
        <Button onClick={resetTranscript}>{`🚫`}</Button>
        <Text color="white">Microphone: {listening ? 'on' : 'off'}</Text>
        <Text color="white">{transcript}</Text>
      </VStack>
    </Box>
  )
}

export default DownloadButton
