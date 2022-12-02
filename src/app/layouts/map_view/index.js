import { AspectRatio } from '@chakra-ui/react'
import Map from 'app/layouts/map_view/Map.js'

const MapView = ({ parentCode, addressCoordinates }) => {
  return (
    <AspectRatio ratio={3 / 4} w="full" borderRadius={'1rem'} overflow="hidden">
      <Map parentCode={parentCode} addressCoordinates={addressCoordinates} />
    </AspectRatio>
  )
}

export default MapView
