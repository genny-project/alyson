import { useIsMobile } from 'utils/hooks'
const Player = ({ src }) => {
  const isMobile = useIsMobile()
  const styles = {
    maxHeight: isMobile ? 'inherit' : '340px',
    minWidth: isMobile ? 'inherit' : '340px',
  }
  return <video style={styles} src={src} controls poster="/video-intro.png" />
}

export default Player
