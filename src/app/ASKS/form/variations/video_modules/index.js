import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const VideoModules = ({ questionCode }) => {
  const title = useSelector(selectCode(questionCode, 'title'))
  const config = useSelector(selectCode(questionCode, 'config'))

  console.log(config)

  return null
}

export default VideoModules
