import { HStack } from '@chakra-ui/react'
import { useIsMobile } from 'utils/hooks'

const hori = mappingFunction => (mappedPcm, depth, config) => {
  const isMobile = useIsMobile()

  const children = mappingFunction(mappedPcm, depth, config ?? { config: { mt: 0 } })
  console.log(children)
  console.log('')
  return (
    <HStack margin={'auto'} direction={isMobile ? 'column' : 'row'} width="min(100%, 38.75rem)">
      {children}
    </HStack>
  )
}

export default hori
