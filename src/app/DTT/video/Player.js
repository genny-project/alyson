import { useRef, useState, useEffect } from 'react'
import { Box, Center, IconButton, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Player = ({ src, inline }) => {
  const videoRef = useRef(null)

  const [paused, setPaused] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getSrc = async () => {
      if (src) {
        try {
          await axios.get(src)
        } catch (err) {
          setError(err)
        }
      } else {
        setError(true)
      }
    }

    getSrc()
  }, [src])

  const togglePlay = () => {
    if (videoRef) {
      if (paused) {
        videoRef.current.play()
        setPaused(false)
      } else {
        videoRef.current.pause()
        setPaused(true)
      }
    }
  }

  if (error)
    return (
      <Center w="100%" color="lightgrey">
        <Text as="samp"> Error retrieving video</Text>
      </Center>
    )

  if (inline)
    return (
      <Box onClick={togglePlay}>
        <video style={{ width: '100%', height: '100%' }} src={src} ref={videoRef} />
        <IconButton
          onClick={togglePlay}
          opacity={paused ? '0.8' : '0'}
          transition="opacity 0.5s"
          variant="unstyled"
          color="white"
          mt="-70%"
          ml="48%"
          icon={
            <FontAwesomeIcon
              style={{ backgroundColor: 'black', borderRadius: '50%', padding: '1px' }}
              size="3x"
              icon={faPlayCircle}
            />
          }
        />
      </Box>
    )
  return (
    <Box onClick={togglePlay}>
      <video style={{ width: '100%', height: '100%' }} src={src} ref={videoRef} />
      <IconButton
        onClick={togglePlay}
        opacity={paused ? '1' : '0'}
        transition="opacity 0.5s"
        variant="unstyled"
        color="white"
        position="fixed"
        left="50%"
        top="13%"
        zIndex="modal"
        icon={<FontAwesomeIcon size="2x" icon={faPlayCircle} />}
      />
    </Box>
  )
}

export default Player
