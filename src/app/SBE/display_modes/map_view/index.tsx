import { Box } from '@chakra-ui/react'

import { useIsMobile } from 'utils/hooks'
import Map from './Map'
import LeftTable from './LeftTable'
import { ReactElement } from 'react'

const MapSearch = ({ parentCode }: { parentCode: string }): ReactElement => {
  const isMobile = useIsMobile()

  return (
    <Box>
      {!isMobile && <LeftTable parentCode={parentCode} />}
      <Map parentCode={parentCode} />
    </Box>
  )
}

export default MapSearch
