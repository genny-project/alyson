import 'app/layouts/components/css/hide-scroll.css'

import { Box, HStack, VStack } from '@chakra-ui/layout'
import { equals, map } from 'ramda'

import Attribute from 'app/BE/attribute'
import { Avatar } from '@chakra-ui/avatar'
import DetailActions from 'app/SBE/detail-profile/detail-layout/intern/templates/Actions.js'
import { LeftDetailAttributesIntern } from 'app/SBE/detail-profile/detail-layout/intern/templates/AttributesList.js'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'
import getUserType from 'utils/helpers/get-user-type'
import sameLength from 'redux/utils/same-length'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useGetRealm } from 'utils/hooks'
import { useSelector } from 'react-redux'

const LeftDetail = ({ beCode, sbeCode }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')
  const userCode = useSelector(selectCode('USER'), equals)
  const userType = getUserType(useSelector(selectCode(userCode), sameLength))

  const eduProviderImage = useSelector(selectCode(beCode, '_LNK_EDU_PROVIDER__PRI_IMAGE_URL')) || {}
  const associatedAgentImage = useSelector(selectCode(beCode, '_LNK_AGENT__PRI_IMAGE_URL')) || {}
  const eduProviderImageSrc = eduProviderImage?.value
  const associatedAgentImageSrc = useApi().getImageSrc(associatedAgentImage?.value)

  const realm = useGetRealm()

  const userImageCode = realm === 'mentormatch' ? 'PRI_USER_PROFILE_PICTURE' : 'PRI_IMAGE_URL'

  return (
    <Box
      bg={cardBg}
      borderRadius="2rem 2rem 0rem 0rem"
      h="100vh"
      position="sticky"
      top="0rem"
      minW="20vw"
    >
      <VStack ml="10" mr="4" my="8" align="start" spacing={8} maxW="30vw">
        {userType === 'HOST_CPY_REP' ? (
          <Box w="full">
            <Attribute
              code={beCode}
              config={{ h: '15rem', w: '15rem' }}
              attribute="PRI_IMAGE_URL"
            />
            <Avatar
              bg="gray.200"
              mt="10.5rem"
              ml="-7.5rem"
              p="4px"
              src={associatedAgentImageSrc}
              w="4.5rem"
              h="4.5rem"
              zIndex="modal"
            />
          </Box>
        ) : (
          <Box w="full">
            <Attribute
              code={beCode}
              config={{ h: '15rem', w: '15rem' }}
              attribute={userImageCode}
            />
            <Avatar
              bg="gray.200"
              mt="10.5rem"
              ml="-8rem"
              p="4px"
              src={eduProviderImageSrc}
              w="4.5rem"
              h="4.5rem"
              zIndex="modal"
            />
            <Avatar
              bg="gray.200"
              mt="10.5rem"
              ml="-1rem"
              p="4px"
              src={associatedAgentImageSrc}
              w="4.5rem"
              h="4.5rem"
              zIndex="modal"
            />
          </Box>
        )}
        <VStack align="start" spacing={4}>
          <HStack spacing={5}>
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
            <Attribute config={{ color: '#3182CE' }} code={beCode} attribute="PRI_LINKEDIN_URL" />
          </HStack>
          {(userType === 'AGENT' || userType === 'ADMIN') && (
            <Attribute code={beCode} attribute="PRI_STAR_RATING" />
          )}
          <DetailActions beCode={beCode} sbeCode={sbeCode} />
          <VStack align="start" spacing={4} py={4}>
            {map(({ icon, attr, attrSecond, config }) => (
              <ShowIconIfNotEmpty
                icon={icon}
                attr={attr}
                attrSecond={attrSecond}
                config={config}
                beCode={beCode}
                key={`${beCode}_${attr}`}
              />
            ))(LeftDetailAttributesIntern)}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default LeftDetail
