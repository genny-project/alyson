import { useRef, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

const Player = ({ src }) => {
  const videoRef = useRef(null)

  const [paused, setPaused] = useState(true)

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

  return (
    <div style={{ width: '20rem', height: '20rem' }} onClick={handleClick}>
      <video
        style={{ position: 'absolute', borderRadius: '1rem', width: '20rem' }}
        src={src}
        ref={videoRef}
      />
      <IconButton
        onClick={handleClick}
        opacity={paused ? '1' : '0'}
        transition="opacity 0.5s"
        position="relative"
        left="calc(50% - 24px)"
        top="5rem"
        variant="unstyled"
        color="white"
        icon={<FontAwesomeIcon size="3x" icon={faPlayCircle} />}
      />
    </div>
  )
}

export default Player
