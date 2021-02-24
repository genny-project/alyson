import React, { useRef, useCallback } from 'react'
import { useUserMedia } from 'utils/hooks'
import { Button, VStack, HStack } from '@chakra-ui/react'

const CAPTURE_OPTIONS = {
  video: true,
}

const Snapshot = ({ handleSave, setLoading, setOpenSnap }) => {
  const videoRef = useRef()
  const stream = useUserMedia(CAPTURE_OPTIONS)

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream
  }

  const onCanPlay = () => videoRef.current.play()

  const onSnapshot = useCallback(async () => {
    setLoading(true)
    const imageCapture = new ImageCapture(stream.getVideoTracks()[0])
    const photoBlob = await imageCapture.takePhoto()
    handleSave([photoBlob])
    setOpenSnap(false)
  }, [handleSave, setLoading, setOpenSnap, stream])

  return (
    <VStack align="left">
      <video
        style={{ width: '10rem', borderRadius: '1rem' }}
        id="preview"
        ref={videoRef}
        onCanPlay={onCanPlay}
        autoPlay
        playsInline
        muted
      />
      <HStack>
        <Button onClick={() => setOpenSnap(false)}>Back</Button>
        <Button onClick={onSnapshot}>Snap!</Button>
      </HStack>
    </VStack>
  )
}

export default Snapshot
