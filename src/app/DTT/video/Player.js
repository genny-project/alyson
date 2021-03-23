import { useRef, useState, useEffect } from 'react'
import { Box, Center, IconButton, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Player = ({ src, styles = {} }) => {
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

  const handleClick = () => {
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
        Error retrieving video
      </Center>
    )
  return (
    <Box
      onClick={handleClick}
      style={{ position: 'absolute', width: '40rem', overflow: 'hidden', ...styles }}
    >
      <video style={{ position: 'absolute', width: '100%' }} src={src} ref={videoRef} />
      <IconButton
        onClick={handleClick}
        opacity={paused ? '1' : '0'}
        transition="opacity 0.5s"
        position="relative"
        left="calc(50% - 24px)"
        top="calc(50% - 24px)"
        variant="unstyled"
        color="white"
        icon={<FontAwesomeIcon size="3x" icon={faPlayCircle} />}
      />
    </Box>
  )
}

export default Player
