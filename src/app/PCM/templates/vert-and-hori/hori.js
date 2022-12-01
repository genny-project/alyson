import { HStack } from '@chakra-ui/react'

const hori = mappingFunction => (mappedPcm, depth) => (
  <HStack margin={'auto'} width="min(100%, 38.75rem)">
    {mappingFunction(mappedPcm, depth, { config: { mt: 0 } })}
  </HStack>
)

export default hori
