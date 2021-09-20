import { useRef, useState, useEffect, useCallback } from 'react'
import { length } from 'ramda'
import { useUserMedia } from 'utils/hooks'
import { Button, Progress, Text, VStack, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons'

const CAPTURE_OPTIONS = {
  audio: true,
  video: true,
}

const VideoRecorder = ({ setData, config, setStartVideo }) => {
  alert('start of the file')

  const videoRef = useRef()
  const recorderRef = useRef()

  const [error, setError] = useState(null)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])

  const stream = useUserMedia(CAPTURE_OPTIONS, setError)

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream
  }

  const onCanPlay = () => videoRef.current.play()

  const onStartCapture = useCallback(() => {
    alert(' start of onStartCapture')

    setCapturing(true)
    setRecordedChunks([])
    recorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' })
    alert(' start of onStartCapture 2')

    recorderRef.current.ondataavailable = ({ data }) => {
      alert(' start of recordref')

      if (data.size > 0) {
        alert(' inside data one')

        setRecordedChunks(prev => [...prev, data])

        alert(' inside data two')
      }
    }
    alert(' record ref previous')

    recorderRef.current.onerror = setError

    alert(' record ref after')

    try {
      alert(' success start')
      recorderRef.current.start()
    } catch (err) {
      alert(' error start')

      setError(err)
    }
  }, [stream])

  console.log('%c Previous', 'font-size: 25px; color:tomato', {
    capturing,
    videoRef,
    recorderRef,
    recordedChunks,
  })

  alert('outside')

  const onStopCapture = useCallback(() => {
    try {
      recorderRef.current.stop()
      setCapturing(false)
      console.log('%c TRIGGERED HERE', 'font-size: 25px; color:yellow')
      alert('stop capture')
    } catch (err) {
      setCapturing(false)
    }
  }, [recorderRef])

  useEffect(() => {
    if (length(recordedChunks) && !capturing) {
      setData(
        new Blob(recordedChunks, {
          type: 'video/webm',
        }),
      )
    }
  }, [capturing, recordedChunks, setData])

  useEffect(() => {
    if (!recorderRef.current) setCapturing(false)
  }, [recorderRef])

  if (error)
    return (
      <VStack>
        <Text style={{ maxWidth: '60rem' }} textAlign="center" mb="5">
          {`Hi, either we were not granted permission to acccess your camera or we could 
  not find it. If you see a camera in the right hand side of 
  the address bar, click it to enable access. Try disconnecting 
  any external monitors and try again.`}
        </Text>
        <Button onClick={() => setStartVideo(false)}>{`Try Again`}</Button>
      </VStack>
    )
  return (
    <VStack spacing="8">
      <VStack hidden={length(recordedChunks) && !capturing}>
        <video
          style={{ width: '60rem', borderRadius: '1rem' }}
          id="preview"
          ref={videoRef}
          onCanPlay={onCanPlay}
          autoPlay
          playsInline
          muted
        />
        <Box pt="5">
          <Button
            test-id={`toggle-recording`}
            colorScheme="primary"
            leftIcon={<FontAwesomeIcon color={capturing ? 'red' : 'grey'} icon={faRecordVinyl} />}
            onClick={capturing ? onStopCapture : onStartCapture}
          >
            {capturing ? 'Stop Recording' : 'Start Recording!'}
          </Button>
        </Box>
      </VStack>
      <Text maxW="60rem">{config.description}</Text>
      <div hidden={!length(recordedChunks) || capturing}>
        <Text textStyle="body.3">Saving!</Text>
        <Progress borderRadius="md" w="20rem" isIndeterminate />
      </div>
    </VStack>
  )
}

export default VideoRecorder
