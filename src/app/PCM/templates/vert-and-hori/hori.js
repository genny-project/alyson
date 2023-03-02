import { equals, includes } from 'ramda'

import { Stack } from '@chakra-ui/react'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'

const hori = mappingFunction => (mappedPcm, depth, config) => {
  const isMobile = useIsMobile()

  const { tplHoriJustify } = useProductColors()
  const { PRI_NAME: pcmName, code: pcmCode } = mappedPcm
  const isPCMEvents = equals(pcmName, 'PCM Events')
  const isFormsPcm = includes('_FORM', pcmCode)

  return (
    <Stack
      spacing={isMobile ? 1 : 5}
      direction={isMobile && !isPCMEvents ? 'column' : 'row'}
      w={'min(100%, 50rem)'}
      justifySelf={'flex-start'}
      justify={tplHoriJustify}
      alignItems={isFormsPcm ? 'flex-end' : 'flex-start'}
    >
      {mappingFunction(mappedPcm, depth, config ?? { config: { mt: 0 } })}
    </Stack>
  )
}

export default hori
