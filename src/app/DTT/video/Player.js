const Player = ({ src }) => (
  <video controls autoPlay muted poster="/video-intro.png">
    <source src={src} />
  </video>
)

export default Player
