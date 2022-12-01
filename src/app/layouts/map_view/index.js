import { Flex } from '@chakra-ui/react'

import Map from 'app/layouts/map_view/Map.js'

const MapView = parentCode => {
  return (
    <Flex h="40vh" w="40vw" border="1px gray solid" position="absolute" mt="2">
      <Map parentCode={parentCode} />
    </Flex>
  )
}

export default MapView
