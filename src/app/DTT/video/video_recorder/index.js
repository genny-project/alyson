import React, { useRef, useState, useEffect, useCallback } from 'react'
import { length } from 'ramda'
import { useUserMedia } from 'utils/hooks'
import { Button, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons'

const CAPTURE_OPTIONS = {
  audio: true,
  video: true,
}

const VideoRecorder = ({ setData, config, setStartVideo }) => {
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
    setCapturing(true)
    setRecordedChunks([])
    recorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' })
    recorderRef.current.ondataavailable = ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(prev => [...prev, data])
      }
    }
    recorderRef.current.onerror = setError
    try {
      recorderRef.current.start()
    } catch (err) {
      setError(err)
    }
  }, [stream])

  const onStopCapture = useCallback(() => {
    recorderRef.current.stop()
    setCapturing(false)
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
        <Text style={{ maxWidth: '30rem' }}>
          {`Hi, either we were not granted permission to acccess your camera or we could 
  not find it. If you see a camera in the right hand side of 
  the address bar, click it to enable access. Try disconnecting 
  any external monitors and try again.`}
        </Text>
        <Button onClick={() => setStartVideo(false)}>{`Try Again`}</Button>
      </VStack>
    )
  return (
    <VStack>
      <VStack hidden={length(recordedChunks) && !capturing}>
        <video
          style={{ width: '20rem', borderRadius: '1rem' }}
          id="preview"
          ref={videoRef}
          onCanPlay={onCanPlay}
          autoPlay
          playsInline
          muted
        />
        <div style={{ marginTop: '-4rem' }}>
          <Button
            colorScheme="primary"
            leftIcon={<FontAwesomeIcon color={capturing ? 'red' : 'grey'} icon={faRecordVinyl} />}
            onClick={capturing ? onStopCapture : onStartCapture}
          >
            {capturing ? 'Stop Recording' : 'Start Recording!'}
          </Button>
        </div>
        <Text style={{ maxWidth: '30rem' }}>{config.description}</Text>
      </VStack>
      <div hidden={!length(recordedChunks) || capturing}>
        <Button
          onClick={() => {
            setRecordedChunks([])
            setData(null)
          }}
        >{`Try Again`}</Button>
      </div>
    </VStack>
  )
}

export default VideoRecorder
