import { split } from 'ramda'

const Player = ({ src }) => {
  const splittedSource = split('/video')(src)
  const headSrc = splittedSource[0]
  const tailSrc = splittedSource[1]
  const finalSrc = `${headSrc}${tailSrc}`
  console.log('finalsrc', { finalSrc })
  return (
    <video
      style={{ maxHeight: '340px', minWidth: '340px' }}
      controls
      autoPlay
      muted
      poster="/video-intro.png"
    >
      <source src={finalSrc} />
    </video>
  )
}

export default Player
