import { HStack } from '@chakra-ui/react'

import Map from './Map'
import { ReactElement } from 'react'

const MapSearch = ({ parentCode }: { parentCode: string }): ReactElement => {
  return (
    <HStack>
      <Map parentCode={parentCode} />
    </HStack>
  )
}

export default MapSearch
