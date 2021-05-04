import { useRef, useEffect, useState } from 'react'
import { useUserMedia } from 'utils/hooks'
import { Button, VStack, HStack, useToast, IconButton, Box, Text, Center } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import sleep from 'utils/helpers/sleep'
import { dec } from 'ramda'

const CAPTURE_OPTIONS = {
  video: true,
}

const Snapshot = ({ handleSave, setLoading, setOpenSnap }) => {
  const toast = useToast()
  const videoRef = useRef()
  const countRef = useRef()
  const imageCapture = useRef()
  const stream = useUserMedia(CAPTURE_OPTIONS, err =>
    toast({
      title: 'Oops',
      description: `${err}`,
      status: 'error',
      isClosable: true,
    }),
  )

  useEffect(() => {
    if (stream) {
      imageCapture.current = new ImageCapture(stream.getVideoTracks()[0])
    }
  }, [stream])

  const onSnapshot = async () => {
    const photoBlob = await imageCapture.current.takePhoto()
    handleSave([photoBlob])
    setLoading(true)
    setOpenSnap(false)
  }

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream
  }

  const onCanPlay = () => videoRef.current.play()

  return (
    <VStack align="left">
      <div ref={countRef} />
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
        <IconButton
          icon={<FontAwesomeIcon icon={faTimes} />}
          size="sm"
          onClick={() => setOpenSnap(false)}
        />
        <CaptureButton isDisabled={!stream} onSnapshot={onSnapshot} />
      </HStack>
    </VStack>
  )
}

const CaptureButton = ({ onSnapshot, isDisabled }) => {
  const [count, setCount] = useState(null)

  const onClick = () => {
    setCount(3)
    onSnapshot()
  }

  useEffect(() => {
    const down = async () => {
      await sleep()
      setCount(dec)
    }
    if (count === 0) {
      setCount(null)
    }
    if (count !== null) {
      down()
    }
  }, [count])
  return (
    <Box>
      <Center
        borderRadius="50%"
        w="4rem"
        h="4rem"
        mt="-130px"
        ml="50px"
        position="fixed"
        zIndex="popover"
        bg="green.300"
        opacity={count !== null && count >= 0 ? 0.7 : 0}
        transition="opacity 0.5s"
      >
        <Text opacity="1" color="white" textStyle="body1">
          {count}
        </Text>
      </Center>

      <Button isDisabled={isDisabled} size="sm" colorScheme="green" onClick={onClick}>
        Snap!
      </Button>
    </Box>
  )
}

export default Snapshot
