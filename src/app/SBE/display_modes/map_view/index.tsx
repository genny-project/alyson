import { Flex } from '@chakra-ui/react'

import { useIsMobile } from 'utils/hooks'
import Map from './Map'
import LeftTable from './LeftTable'
import { ReactElement } from 'react'

const MapSearch = ({ parentCode }: { parentCode: string }): ReactElement => {
  const isMobile = useIsMobile()

  return (
    <Flex h="100vh" w="98vw" border="1px black solid">
      {!isMobile && <LeftTable parentCode={parentCode} />}
      <Map parentCode={parentCode} />
    </Flex>
  )
}

export default MapSearch
