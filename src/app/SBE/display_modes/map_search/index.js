import { Box } from '@chakra-ui/react'
import Map from './Map'
import LeftTable from './LeftTable'

const MapSearch = ({ parentCode }) => {
  return (
    <Box>
      <LeftTable parentCode={parentCode} />

      <Map parentCode={parentCode} />
    </Box>
  )
}

export default MapSearch
