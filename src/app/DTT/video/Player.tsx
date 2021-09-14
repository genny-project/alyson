import { compose, split, reduce } from 'ramda'
import { ReactElement } from 'react'

const Player = ({ src }: { src: string }): ReactElement => {
  const getValue = reduce((acc: string, value: string): string => acc + value, '')
  const final = compose(getValue, split('/video'))(src)

  return (
    <video
      style={{ maxHeight: '340px', minWidth: '340px' }}
      controls
      autoPlay
      muted
      poster="/video-intro.png"
    >
      <source src={final} />
    </video>
  )
}

export default Player
