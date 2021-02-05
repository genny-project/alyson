import useApi from 'api'
import { Avatar } from '@chakra-ui/react'

const Read = ({ data }) => {
  const { getImageSrc } = useApi()
  const src = getImageSrc(data?.value)

  if (!src || !data?.value) return <Avatar />
  return <Avatar src={src} />
}

const ImageType = {
  Read,
}

export default ImageType
