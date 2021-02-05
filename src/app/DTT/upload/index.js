import useApi from 'api'
import { Avatar } from '@chakra-ui/react'

const Read = ({ data }) => {
  const { getImageSrc } = useApi()

  const { attributeName } = data
  const src = getImageSrc(data.value)

  if (!src) return <div />

  return attributeName === 'ImageUrl' ? <Avatar src={src} /> : <div>UPLOAD</div>
}

const Upload = {
  Read,
}

export default Upload
