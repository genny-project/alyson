import { Box } from '@chakra-ui/react'

import { useIsMobile } from 'utils/hooks'
import Map from './Map'
import LeftTable from './LeftTable'

const MapSearch = ({ parentCode }) => {
  const isMobile = useIsMobile()

  return (
    <Box>
      {!isMobile && <LeftTable parentCode={parentCode} />}
      <Map parentCode={parentCode} />
    </Box>
  )
}

export default MapSearch
