import { apiConfig } from 'config/get-api-config'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { LOGO_WIDTH } from 'utils/constants'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { Box } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'

const TemplateLogo = ({ mappedPcm }) => {
  const { PRI_LOC1, PRI_LOC2 } = mappedPcm

  const { clientId } = apiConfig
  const appName = convertToUppercase(clientId)
  const entityCode = 'PRJ_' + appName

  const handleClick = childCode => {
    sendAskClick(childCode, childCode)
  }

  return (
    <PcmField
      // EVT triggered when the logo is clicked
      code={PRI_LOC1}
      mappedPcm={mappedPcm}
      child={paramaters => (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor={'pointer'}
            onClick={() => handleClick(paramaters.ask.questionCode)}
          >
            {/* This is the actual logo attribute */}
            <PcmField
              code={PRI_LOC2}
              mappedPcm={mappedPcm}
              props={{
                parentCode: entityCode,
                config: { htmlWidth: LOGO_WIDTH },
              }}
            />
          </Box>
        </>
      )}
    />
  )
}

export default TemplateLogo
