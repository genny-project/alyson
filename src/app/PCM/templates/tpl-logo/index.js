import { apiConfig } from 'config/get-api-config'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import getPcmField from '../../helpers/get-pcm-field'
import { LOGO_WIDTH } from 'utils/constants'
import sendAskClick from 'app/ASKS/utils/send-ask-click'

const TemplateLogo = ({ mappedPcm }) => {
  /// Loc1 is the evt, loc2 is the logo attribute
  const { PRI_LOC1, PRI_LOC2 } = mappedPcm

  const { realm } = apiConfig
  const appName = convertToUppercase(realm)
  const entityCode = 'PRJ_' + appName

  const handleClick = childCode => {
    sendAskClick(childCode, childCode)
  }

  return (
    <>
      {apiConfig &&
        getPcmField(
          PRI_LOC1,
          mappedPcm,
        )((questionCode, childCode, attributeCode) => (
          <div onClick={() => handleClick(childCode)}>
            {getPcmField(PRI_LOC2, mappedPcm, {
              parentCode: entityCode,
              config: { htmlWidth: LOGO_WIDTH },
            })()}
          </div>
        ))()}
    </>
  )
}

export default TemplateLogo
