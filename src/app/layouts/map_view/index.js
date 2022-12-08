import { AspectRatio } from '@chakra-ui/react'
import Map from 'app/layouts/map_view/Map.js'

const MapView = props => {
  return (
    <AspectRatio ratio={3 / 4} w="full" borderRadius={'1rem'} overflow="hidden">
      <Map {...props} />
    </AspectRatio>
  )
}

export default MapView
