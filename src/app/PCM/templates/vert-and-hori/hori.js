import { equals, includes } from 'ramda'

import { Stack } from '@chakra-ui/react'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'

const hori = mappingFunction => (mappedPcm, depth, config) => {
  const isMobile = useIsMobile()

  const { tplHoriJustify, askWidth } = useProductColors()
  const { PRI_NAME: pcmName, code: pcmCode } = mappedPcm
  const isPCMEvents = equals(pcmName, 'PCM Events')
  const isFormsPcm = includes('_FORM', pcmCode)

  const isInternmatch = useIsProductInternmatch()

  return (
    <Stack
      spacing={isMobile ? 1 : 5}
      direction={isMobile && !isPCMEvents ? 'column' : 'row'}
      w={isPCMEvents && !isInternmatch ? askWidth : 'min(100%,52rem)'}
      justifySelf={'flex-start'}
      justifyItems={tplHoriJustify}
      alignItems={isFormsPcm ? 'flex-end' : 'flex-start'}
    >
      {mappingFunction(mappedPcm, depth, isInternmatch, config ?? { config: { mt: 0 } })}
    </Stack>
  )
}

export default hori
