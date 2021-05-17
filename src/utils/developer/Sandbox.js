import { VStack, Image } from '@chakra-ui/react'
import getYtThumbnail from 'utils/helpers/get-yt-thumbnail'

const Sandbox = () => {
  return (
    <VStack>
      <Image src={getYtThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'default')} />
      <Image src={getYtThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'mqdefault')} />
      <Image src={getYtThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'hqdefault')} />
      <Image src={getYtThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'sddefault')} />
      <Image src={getYtThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'maxresdefault')} />
    </VStack>
  )
}

export default Sandbox
