import { ReactElement } from 'react'
import { Flex } from '@chakra-ui/react'

import { useIsMobile } from 'utils/hooks'
import Map from './Map'
import LeftTable from './LeftTable'

const MapSearch = ({ parentCode }: { parentCode: string }): ReactElement => {
  const isMobile = useIsMobile()

  return (
    <Flex h="80vh" w="98vw" border="1px gray solid" position="fixed" mt="2">
      {!isMobile && <LeftTable parentCode={parentCode} />}
      <Map parentCode={parentCode} />
    </Flex>
  )
}

export default MapSearch
