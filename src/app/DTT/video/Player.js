import { compose, split, reduce } from 'ramda'

const Player = ({ src }) => {
  const getValue = reduce((acc, value) => acc + value, '')
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
