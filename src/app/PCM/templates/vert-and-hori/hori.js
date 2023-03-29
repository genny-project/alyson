import { equals, includes } from 'ramda'

import { Stack } from '@chakra-ui/react'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'

const hori = mappingFunction => (mappedPcm, depth, config) => {
  const isMobile = useIsMobile()

  const { tplHoriJustify, askWidth } = useProductColors()
  const { PRI_NAME: pcmName, code: pcmCode, parentCode } = mappedPcm
  const isPCMEvents = equals(pcmName, 'PCM Events')
  const isFormsPcm = includes('_FORM', pcmCode)

  const isFullWidthForm = equals(parentCode, 'PCM_FORM_TENANT')

  const isInternmatch = useIsProductInternmatch()

  return (
    <Stack
      spacing={isMobile ? 1 : 5}
      direction={isMobile && !isPCMEvents ? 'column' : 'row'}
      w={isPCMEvents && !isInternmatch ? askWidth : isFullWidthForm ? 'full' : 'min(100%,52rem)'}
      justifySelf={'flex-start'}
      justifyItems={tplHoriJustify}
      alignItems={isFormsPcm && !equals(parentCode, 'PCM_FORM_TENANT') ? 'flex-end' : 'flex-start'}
      _empty={{ display: 'none' }}
    >
      {mappingFunction(mappedPcm, depth, isInternmatch, config ?? { config: { mt: 0, bg: 'red' } })}
    </Stack>
  )
}

export default hori
