import { ReactElement } from 'react'

const Player = ({ src }: { src: string }): ReactElement => {
  return (
    <video
      style={{ maxHeight: '340px', minWidth: '340px' }}
      controls
      autoPlay
      muted
      poster="/video-intro.png"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

export default Player
