import { map } from 'ramda'
import { useSelector } from 'react-redux'
import { VStack, HStack, Box, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { useColorModeValue } from '@chakra-ui/color-mode'
import useApi from 'api'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'

import DetailActions from 'app/SBE/detail-profile/detail-layout/application/templates/Actions.js'
import { LeftDetailAttributesApplication } from 'app/SBE/detail-profile/detail-layout/application/templates/AttributesList.js'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'

const LeftDetail = ({ beCode, sbeCode }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')

  const internsImage = useSelector(selectCode(beCode, '_PRI_INTERN_CODE__PRI_IMAGE_URL')) || {}
  const internsImageSrc = useApi().getImageSrc(internsImage?.value)

  const linkedAgentImage = useSelector(selectCode(beCode, '_LNK_AGENT__PRI_IMAGE_URL')) || {}
  const linkedAgentImageSrc = useApi().getImageSrc(linkedAgentImage?.value)

  const linkedInternshipImage =
    useSelector(selectCode(beCode, '_LNK_HOST_COMPANY__PRI_IMAGE_URL')) || {}
  const linkedInternshipImageSrc = useApi().getImageSrc(linkedInternshipImage?.value)

  const linkedSupervisorImage =
    useSelector(selectCode(beCode, '_LNK_INTERN_SUPERVISOR__PRI_IMAGE_URL')) || {}
  const linkedSupervisorSrc = useApi().getImageSrc(linkedSupervisorImage?.value)

  return (
    <Box
      bg={cardBg}
      borderRadius="2rem 2rem 0rem 0rem"
      h="100vh"
      position="sticky"
      top="0rem"
      minW="25vw"
      maxW="30vw"
    >
      <VStack ml="10" mr="4" my="8" align="start" spacing={8} maxW="30vw">
        <VStack align="start">
          <Box w="full">
            <Avatar src={internsImageSrc} w="7rem" h="7rem" zIndex="modal" />
            <Avatar
              ml="-1rem"
              bg="#ffffff"
              p="1"
              src={linkedAgentImageSrc}
              w="7rem"
              h="7rem"
              zIndex="modal"
            />
          </Box>
          <HStack spacing={4}>
            <Attribute config={{ textStyle: 'body.1' }} code={beCode} attribute="PRI_INTERN_NAME" />
            <Attribute code={beCode} attribute="_PRI_INTERN_CODE__PRI_LINKEDIN_URL" />
          </HStack>
          <Text>{`is applying at`}</Text>
          <HStack spacing={4}>
            <Attribute
              config={{ textStyle: 'body.1' }}
              code={beCode}
              attribute="_LNK_INTERNSHIP__LNK_HOST_COMPANY__PRI_NAME"
            />
            <Attribute code={beCode} attribute="_LNK_HOST_COMPANY__PRI_LINKEDIN_URL" />
          </HStack>

          <Box w="full">
            <Avatar src={linkedInternshipImageSrc} w="7rem" h="7rem" zIndex="modal" />
            <Avatar
              ml="-1rem"
              bg="#ffffff"
              p="1"
              src={linkedSupervisorSrc}
              w="7rem"
              h="7rem"
              zIndex="modal"
            />
          </Box>
        </VStack>
        <VStack align="start" spacing={4}>
          <DetailActions beCode={beCode} sbeCode={sbeCode} />
          <VStack align="start" spacing={4} py={4}>
            {map(({ icon, attr, attrSecond, config }) => (
              <ShowIconIfNotEmpty
                icon={icon}
                attr={attr}
                attrSecond={attrSecond}
                config={config}
                beCode={beCode}
              />
            ))(LeftDetailAttributesApplication)}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default LeftDetail
