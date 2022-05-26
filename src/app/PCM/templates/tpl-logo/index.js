import { apiConfig } from 'config/get-api-config'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import getPcmField from '../../helpers/get-pcm-field'
import { LOGO_WIDTH } from 'utils/constants'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { Box } from '@chakra-ui/react'

const TemplateLogo = ({ mappedPcm }) => {
  /// Loc1 is the evt, loc2 is the logo attribute
  const { PRI_LOC1, PRI_LOC2 } = mappedPcm

  const { clientId } = apiConfig
  const appName = convertToUppercase(clientId)
  const entityCode = 'PRJ_' + appName

  const handleClick = childCode => {
    sendAskClick(childCode, childCode)
  }

  const getLoc2 = getPcmField(PRI_LOC2, mappedPcm, {
    parentCode: entityCode,
    config: { htmlWidth: LOGO_WIDTH },
  })()

  return getPcmField(
    PRI_LOC1,
    mappedPcm,
  )((questionCode, childCode, attributeCode) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor={'pointer'}
      onClick={() => handleClick(childCode)}
    >
      {getLoc2}
    </Box>
  ))
}

export default TemplateLogo
