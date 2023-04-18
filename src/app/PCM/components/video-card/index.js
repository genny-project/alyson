import { Box } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'

const VideoCard = props => {
  const { code, attribute } = props

  return (
    <Box w={'33rem'} h={'18rem'} bg={'pink'} borderRadius={'2.5rem'}>
      <Attribute
        code={code}
        attribute={attribute}
        config={{ height: 'inherit', width: 'inherit', borderRadius: '2.5rem' }}
      />
    </Box>
  )
}

export default VideoCard
