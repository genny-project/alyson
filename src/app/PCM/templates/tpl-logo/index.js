import { LOGO_WIDTH, LOGO_WIDTH_SM } from 'utils/constants'

import { Box } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { useIsMobile } from 'utils/hooks'
import { useGetProjectInformation } from 'app/BE/project-be'

const TemplateLogo = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2 } = mappedPcm
  const isMobile = useIsMobile()
  const { projectCode: entityCode } = useGetProjectInformation()

  const handleClick = childCode => {
    sendAskClick(childCode, childCode)
  }

  return (
    <PcmField
      // EVT triggered when the logo is clicked
      code={PRI_LOC1}
      mappedPcm={mappedPcm}
      depth={depth}
      config={{ readonly: true }}
      child={paramaters => (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor={'pointer'}
            onClick={() => handleClick(paramaters?.ask?.questionCode)}
          >
            {/* This is the actual logo attribute */}
            <PcmField
              code={PRI_LOC2}
              depth={depth}
              mappedPcm={mappedPcm}
              config={{
                parentCode: entityCode,
                readonly: true,
                config: { htmlWidth: isMobile ? LOGO_WIDTH_SM : LOGO_WIDTH },
              }}
            />
          </Box>
        </>
      )}
    />
  )
}

export default TemplateLogo
