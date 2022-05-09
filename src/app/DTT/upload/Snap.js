import { Box, Button, Center, HStack, IconButton, Text, VStack, useToast } from '@chakra-ui/react'
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dec } from 'ramda'
import sleep from 'utils/helpers/sleep'
import { useUserMedia } from 'utils/hooks'

const CAPTURE_OPTIONS = {
  video: true,
}

const Snapshot = ({ handleSave, setLoading, setOpenSnap }) => {
  const toast = useToast()
  const videoRef = useRef()
  const countRef = useRef()
  const stream = useUserMedia(CAPTURE_OPTIONS, err =>
    toast({
      isClosable: true,
      render: () => (
        <HStack
          paddingBlock={5}
          paddingInline={6}
          bg="error.50"
          borderWidth={'1px'}
          borderColor={'error.900'}
          borderRadius={'lg'}
        >
          <FontAwesomeIcon color="#700f0f" icon={faExclamationTriangle} size="lg" />
          <Box>
            <Text variant="head.3" color="text.light">
              {`Oops`}
            </Text>
            <Text>{err}</Text>
          </Box>
        </HStack>
      ),
    }),
  )

  const getBlobFromMediaStream = stream => {
    if ('ImageCapture' in window) {
      console.log('what?')
      const videoTrack = stream.getVideoTracks()[0]
      const imageCapture = new ImageCapture(videoTrack)
      return imageCapture.takePhoto()
    } else {
      console.log('thats right!')

      const video = document.createElement('video')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      video.srcObject = stream

      return new Promise((resolve, reject) => {
        video.addEventListener('loadeddata', async () => {
          const { videoWidth, videoHeight } = video
          canvas.width = videoWidth
          canvas.height = videoHeight

          try {
            await video.play()
            context.drawImage(video, 0, 0, videoWidth, videoHeight)
            canvas.toBlob(resolve, 'image/png')
          } catch (error) {
            reject(error)
          }
        })
      })
    }
  }

  // useEffect(() => {
  //   if (stream && 'ImageCapture' in window) {
  //     imageCapture.current = new ImageCapture(stream.getVideoTracks()[0])
  //   } else {
  //     const video = document.createElement('video')
  //     const canvas = document.createElement('canvas')
  //     const context = canvas.getContext('2d')

  //     video.srcObject = stream

  //     return new Promise((resolve, reject) => {
  //       video.addEventListener('loadeddata', async () => {
  //         const { videoWidth, videoHeight } = video
  //         canvas.width = videoWidth
  //         canvas.height = videoHeight

  //         try {
  //           await video.play()
  //           context.drawImage(video, 0, 0, videoWidth, videoHeight)
  //           console.log('this one', 'ImageCapture' in window, context)

  //           canvas.toBlob(resolve, 'image/png')
  //         } catch (error) {
  //           reject(error)
  //         }
  //       })
  //     })
  //   }
  // }, [stream])

  const onSnapshot = async () => {
    const photoBlob = await getBlobFromMediaStream(stream)
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
        <Text opacity="1" color="white" textStyle="body.1">
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
