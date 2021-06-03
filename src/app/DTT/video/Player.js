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

  return (
    <Box onClick={togglePlay}>
      <video src={src} ref={videoRef} controls />
      <IconButton
        onClick={togglePlay}
        opacity={paused ? '1' : '0'}
        transition="opacity 0.5s"
        variant="unstyled"
        color="white"
        position="fixed"
        left="calc(50% - 1.5rem)"
        top="calc(30%)"
        zIndex="modal"
        icon={<FontAwesomeIcon size="2x" icon={faPlayCircle} />}
      />
    </Box>
  )
}

export default Player
