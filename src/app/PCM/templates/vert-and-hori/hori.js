import { Stack } from '@chakra-ui/react'
import { equals } from 'ramda'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'

const hori = mappingFunction => (mappedPcm, depth, config) => {
  const isMobile = useIsMobile()

  const { tplHoriJustify } = useProductColors()
  const { PRI_NAME: pcmName } = mappedPcm
  const isPCMEvents = equals(pcmName, 'PCM Events')
  return (
    <Stack
      spacing={isMobile ? 1 : 5}
      direction={isMobile && !isPCMEvents ? 'column' : 'row'}
      w={'min(100%, 49.25rem)'}
      justifySelf={'flex-start'}
      justify={tplHoriJustify}
    >
      {mappingFunction(mappedPcm, depth, config ?? { config: { mt: 0 } })}
    </Stack>
  )
}

export default hori
