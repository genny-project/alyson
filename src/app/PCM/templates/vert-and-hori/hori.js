import { HStack } from '@chakra-ui/react'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'

const hori = mappingFunction => (mappedPcm, depth, config) => {
  const isMobile = useIsMobile()

  const { tplHoriJustify } = useProductColors()

  return (
    <HStack spacing={5} direction={isMobile ? 'column' : 'row'} w={'full'} justify={tplHoriJustify}>
      {mappingFunction(mappedPcm, depth, config ?? { config: { mt: 0 } })}
    </HStack>
  )
}

export default hori
