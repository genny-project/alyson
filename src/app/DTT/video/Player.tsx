import { ReactElement } from 'react'

const Player = ({ src }: { src: string }): ReactElement => {
  return (
    <video
      style={{ maxHeight: '340px', minWidth: '240px' }}
      controls
      autoPlay
      muted
      poster="/video-intro.png"
    >
      <source src={src} />
    </video>
  )
}

export default Player
