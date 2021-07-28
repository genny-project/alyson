const Player = ({ src }) => (
  <video
    style={{ maxHeight: '340px', minWidth: '340px' }}
    controls
    autoPlay
    muted
    poster="/video-intro.png"
  >
    <source src={src} />
  </video>
)

export default Player
