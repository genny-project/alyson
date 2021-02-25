import React, { useRef, useCallback } from 'react'
import { useUserMedia } from 'utils/hooks'
import { Button, VStack, HStack, useToast } from '@chakra-ui/react'

const CAPTURE_OPTIONS = {
  video: true,
}

const Snapshot = ({ handleSave, setLoading, setOpenSnap }) => {
  const toast = useToast()
  const videoRef = useRef()
  const stream = useUserMedia(CAPTURE_OPTIONS, err =>
    toast({
      title: 'Oops',
      description: `${err}`,
      status: 'error',
      isClosable: true,
    }),
  )

  const onSnapshot = useCallback(async () => {
    const imageCapture = new ImageCapture(stream.getVideoTracks()[0])
    const photoBlob = await imageCapture.takePhoto()
    handleSave([photoBlob])
    setLoading(true)
    setOpenSnap(false)
  }, [handleSave, setLoading, setOpenSnap, stream])

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream
  }

  const onCanPlay = () => videoRef.current.play()

  return (
    <VStack align="left">
      <video
        style={{ width: '15rem', borderRadius: '1rem' }}
        id="preview"
        ref={videoRef}
        onCanPlay={onCanPlay}
        autoPlay
        playsInline
        muted
      >
        Stream not available
      </video>
      <HStack>
        <Button size="sm" onClick={() => setOpenSnap(false)}>
          Back
        </Button>
        <Button isDisabled={!stream} size="sm" colorScheme="green" onClick={onSnapshot}>
          Snap!
        </Button>
      </HStack>
    </VStack>
  )
}

export default Snapshot
