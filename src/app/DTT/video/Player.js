import { useRef, useState, useEffect } from 'react'
import { Box, Center, IconButton, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Player = ({
  src,
  styles = { width: '20rem', height: '15rem', borderRadius: '1rem' },
  inline,
}) => {
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
      <Box onClick={togglePlay} style={{ ...styles }}>
        <video style={{ width: '100%', height: '100%' }} src={src} ref={videoRef} />
        <IconButton
          onClick={togglePlay}
          opacity={paused ? '0.8' : '0'}
          transition="opacity 0.5s"
          variant="unstyled"
          color="white"
          mt="-80%"
          ml="45%"
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
    <Box
      onClick={togglePlay}
      style={{ position: 'absolute', width: '40rem', overflow: 'hidden', ...styles }}
    >
      <video
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        src={src}
        ref={videoRef}
      />
      <IconButton
        onClick={togglePlay}
        opacity={paused ? '0.8' : '0'}
        transition="opacity 0.5s"
        position="relative"
        left="calc(50% - 24px)"
        top="calc(50% - 24px)"
        variant="unstyled"
        color="white"
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
}

export default Player
