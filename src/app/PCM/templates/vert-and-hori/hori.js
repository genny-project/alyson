import { HStack } from '@chakra-ui/react'
import { useIsMobile } from 'utils/hooks'

const hori = mappingFunction => (mappedPcm, depth, config) => {
  const isMobile = useIsMobile()

  return (
    <HStack spacing={5} direction={isMobile ? 'column' : 'row'} w={'full'}>
      {mappingFunction(mappedPcm, depth, config ?? { config: { mt: 0 } })}
    </HStack>
  )
}

export default hori
