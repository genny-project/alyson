import { HStack, VStack } from '@chakra-ui/react'
import { faEnvelopeOpenText, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DetailSection from 'app/layouts/components/detail_section'
import { caps, seeAgent } from 'config/caps'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import AgentSelector from './AgentSelector'

const LeftHandDetails = ({
  beCode,
  contactDetails,
  horizontalLayoutDetails,
  internshipDetails,
}) => {
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  return (
    <VStack align="start" w="40%">
      {caps(userType)(seeAgent) && <AgentSelector beCode={beCode} />}
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faUser} />
        <VStack align="start">
          <DetailSection
            config={{ textStyle: 'body.2' }}
            noTitle={false}
            code={beCode}
            details={contactDetails}
            hideLabel
          />
          <DetailSection
            config={{ textStyle: 'body.2' }}
            noTitle
            code={beCode}
            details={horizontalLayoutDetails}
            hideLabel
            horizontalLayout
          />
        </VStack>
      </HStack>
      <HStack spacing="10" align="start" mb="1rem">
        <FontAwesomeIcon icon={faEnvelopeOpenText} />
        <DetailSection
          config={{ textStyle: 'body.2' }}
          noTitle={false}
          code={beCode}
          details={internshipDetails}
          hideLabel
          horizontalLayout
        />
      </HStack>
    </VStack>
  )
}

export default LeftHandDetails
