import { useRef, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

const Player = ({ src }) => {
  const videoRef = useRef(null)

  const [paused, setPaused] = useState(true)

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

  return (
    <Box
      onClick={togglePlay}
      style={{ position: 'absolute', width: '40rem', overflow: 'hidden', ...styles }}
    >
      <video style={{ position: 'absolute', width: '100%' }} src={src} ref={videoRef} />
      <IconButton
        onClick={togglePlay}
        opacity={paused ? '1' : '0'}
        transition="opacity 0.5s"
        position="relative"
        left="calc(50% - 24px)"
        top="5.5rem"
        variant="unstyled"
        color="white"
        icon={<FontAwesomeIcon size="3x" icon={faPlayCircle} />}
      />
    </Box>
  )
}

export default Player
