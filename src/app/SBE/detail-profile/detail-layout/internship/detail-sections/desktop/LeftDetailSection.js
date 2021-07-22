import { map } from 'ramda'
import { useSelector } from 'react-redux'
import { VStack, HStack, Box } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { useColorModeValue } from '@chakra-ui/color-mode'
import useApi from 'api'

import DetailActions from 'app/SBE/detail-profile/detail-layout/internship/templates/Actions.js'
import { LeftDetailAttributesInternship } from 'app/SBE/detail-profile/detail-layout/internship/templates/AttributesList.js'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'

const LeftDetail = ({ beCode, sbeCode }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')

  const linkedInternshipSupervisorImage =
    useSelector(selectCode(beCode, '_LNK_INTERN_SUPERVISOR__PRI_IMAGE_URL')) || {}
  const linkedInternshipSupervisorImageSrc = useApi().getImageSrc(
    linkedInternshipSupervisorImage?.value,
  )

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
        <Box w="full">
          <Attribute code={beCode} config={{ h: '15rem', w: '15rem' }} attribute="PRI_IMAGE_URL" />
          <Avatar
            bg="gray.200"
            mt="10.5rem"
            ml="-7.5rem"
            p="4px"
            src={linkedInternshipSupervisorImageSrc}
            w="4.5rem"
            h="4.5rem"
            zIndex="modal"
          />
        </Box>
        <VStack align="start" spacing={4}>
          <Attribute code={beCode} attribute="PRI_NAME" config={{ textStyle: 'head.1' }} />
          <HStack spacing={5}>
            <Attribute
              config={{ textStyle: 'body.2' }}
              code={beCode}
              attribute="_LNK_HOST_COMPANY__PRI_NAME"
            />
            <Attribute
              config={{ color: '#3182CE' }}
              code={beCode}
              attribute="_LNK_HOST_COMPANY__PRI_LINKEDIN_URL"
            />
          </HStack>
          <DetailActions beCode={beCode} sbeCode={sbeCode} />
          <VStack align="start" spacing={4}>
            {map(({ icon, attr, attrSecond, config }) => (
              <ShowIconIfNotEmpty
                icon={icon}
                attr={attr}
                attrSecond={attrSecond}
                config={config}
                beCode={beCode}
              />
            ))(LeftDetailAttributesInternship)}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default LeftDetail
