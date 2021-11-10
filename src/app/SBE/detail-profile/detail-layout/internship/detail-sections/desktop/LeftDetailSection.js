import 'app/layouts/components/css/hide-scroll.css'

import { Box, HStack, VStack } from '@chakra-ui/layout'
import {
  LeftDetailAttributesInternship,
  LeftDetailAttributesInternshipInternView,
} from 'app/SBE/detail-profile/detail-layout/internship/templates/AttributesList.js'

import Attribute from 'app/BE/attribute'
import { Avatar } from '@chakra-ui/avatar'
import DetailActions from 'app/SBE/detail-profile/detail-layout/internship/templates/Actions.js'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'
import getUserType from 'utils/helpers/get-user-type'
import { map } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useSelector } from 'react-redux'

const LeftDetail = ({ beCode, sbeCode }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')

  const linkedInternshipSupervisorImage =
    useSelector(selectCode(beCode, '_LNK_INTERN_SUPERVISOR__PRI_IMAGE_URL')) || {}
  const linkedInternshipSupervisorImageSrc = useApi().getImageSrc(
    linkedInternshipSupervisorImage?.value,
  )

  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

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
          <Attribute
            code={beCode}
            attribute="PRI_INTERNSHIP_TITLE"
            config={{ textStyle: 'head.1' }}
          />
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
          <VStack align="start" spacing={4} py={4}>
            {userType === 'INTERN'
              ? map(({ icon, attr, attrSecond, config }) => (
                  <ShowIconIfNotEmpty
                    icon={icon}
                    attr={attr}
                    attrSecond={attrSecond}
                    config={config}
                    beCode={beCode}
                    key={`${beCode}_${attr}`}
                  />
                ))(LeftDetailAttributesInternshipInternView)
              : map(({ icon, attr, attrSecond, config }) => (
                  <ShowIconIfNotEmpty
                    icon={icon}
                    attr={attr}
                    attrSecond={attrSecond}
                    config={config}
                    beCode={beCode}
                    key={`${beCode}_${attr}`}
                  />
                ))(LeftDetailAttributesInternship)}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default LeftDetail
