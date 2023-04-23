import { Box } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'

const VideoCard = ({ targetCode }) => {
  return (
    <Box w={'33rem'} h={'18rem'} borderRadius={'2.5rem'}>
      <Attribute
        code={targetCode}
        attribute={'PRI_VIDEO_URL'}
        config={{ height: 'inherit', width: 'inherit', borderRadius: '2.5rem' }}
      />
    </Box>
  )
}

export default VideoCard
