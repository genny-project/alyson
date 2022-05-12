const Player = ({ src, styles = { maxHeight: '340px', minWidth: '340px' } }) => {
  return <video style={styles} src={src} controls poster="/video-intro.png" />
}

export default Player
