import { Write } from '../text'
import ReactPlayer from 'react-player/lazy'

const Read = ({ data, width = 350, height = 150 }) => {
  if (!data?.value) return null

  const { value, attributeCode } = data

  return <ReactPlayer width={width} height={height} controls test-id={attributeCode} url={value} />
}

const ThirdPartyVideo = {
  Read,
  Write,
}

export default ThirdPartyVideo
