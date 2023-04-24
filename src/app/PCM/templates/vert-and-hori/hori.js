import { equals, includes } from 'ramda'

import { Stack } from '@chakra-ui/react'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'

const hori = mappingFunction => (mappedPcm, depth, config, showCard = false) => {
  const isMobile = useIsMobile()

  const { tplHoriJustify, askWidth } = useProductColors()
  const { PRI_NAME: pcmName, code: pcmCode, parentCode } = mappedPcm
  const isPCMEvents = equals(pcmName, 'PCM Events')
  const isFormsPcm = includes('_FORM', pcmCode)
  const tenantPreApprovalForms =
    includes('_FORM_UNIVERSITY_DETAILS', pcmCode) || includes('_FORM_WORK_DETAILS', pcmCode)

  const isInternmatch = useIsProductInternmatch()
  const isImageUpload = includes('IMAGE_UPLOAD', pcmCode)
  return (
    <Stack
      borderRadius={showCard ? '3xl' : 'none'}
      bg={showCard ? 'white' : 'transparent'}
      spacing={isMobile ? 1 : 5}
      direction={isMobile && !isPCMEvents ? 'column' : 'row'}
      w={
        isPCMEvents && !isInternmatch
          ? askWidth
          : isFormsPcm && !isInternmatch
          ? 'min(100%, 78rem)'
          : 'min(100%, 52rem)'
      }
      justifySelf={'flex-start'}
      justifyItems={tplHoriJustify}
      alignItems={
        isImageUpload
          ? 'center'
          : tenantPreApprovalForms
          ? 'flex-start'
          : isFormsPcm && !equals(parentCode, 'PCM_FORM_TENANT')
          ? 'flex-end'
          : 'flex-start'
      }
      _empty={{ display: 'none' }}
    >
      {mappingFunction(mappedPcm, depth, isInternmatch, config ?? { config: { mt: 0, bg: 'red' } })}
    </Stack>
  )
}

export default hori
