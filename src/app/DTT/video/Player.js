const Player = ({ src }) => (
  <video style={{ maxHeight: '280px' }} controls autoPlay muted poster="/video-intro.png">
    <source src={src} />
  </video>
)

export default Player
