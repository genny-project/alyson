import 'app/layouts/components/css/hide-scroll.css'

import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { equals, isEmpty, map } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import DetailActions from 'app/SBE/detail-profile/detail-layout/intern/templates/Actions.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@chakra-ui/react'
import { LeftDetailAttributesIntern } from 'app/SBE/detail-profile/detail-layout/intern/templates/AttributesList.js'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'
import { closeDrawer } from 'redux/app'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import getUserType from 'utils/helpers/get-user-type'
import sameLength from 'redux/utils/same-length'
import { selectCode } from 'redux/db/selectors'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useGetRealm } from 'utils/hooks'

const Header = ({ beCode, sbeCode }) => {
  const userCode = useSelector(selectCode('USER'), equals)
  const userType = getUserType(useSelector(selectCode(userCode), sameLength))

  const cardBg = useColorModeValue('#ffffff', 'gray.600')
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const videoSrc = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))?.value
  const hasVideo = !isEmpty(videoSrc)

  const realm = useGetRealm()
  const userImageCode = realm === 'mentormatch' ? 'PRI_USER_PROFILE_PICTURE' : 'PRI_IMAGE_URL'

  return (
    <Box bg={cardBg} borderRadius="2rem 2rem 0rem 0rem">
      <VStack spacing={2} align="start">
        <Box overflow="hidden" borderRadius="50%" position="absolute" zIndex="modal" right="6">
          <IconButton
            onClick={onClose}
            size="sm"
            color="#ffffff"
            bg="#000000"
            icon={<FontAwesomeIcon opacity={50} icon={faTimes} />}
          />
        </Box>
        <Attribute code={beCode} config={{ h: '5rem', w: '5rem' }} attribute={userImageCode} />
        <VStack align="start" spacing={2}>
          <HStack spacing={5}>
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
            <Attribute config={{ color: '#3182CE' }} code={beCode} attribute="PRI_LINKEDIN_URL" />
          </HStack>
          {(userType === 'AGENT' || userType === 'ADMIN') && (
            <Attribute code={beCode} attribute="PRI_STAR_RATING" />
          )}{' '}
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
        <Center w="full">
          <Card p={0} w="full" bg="#1A365D" overflow="hidden">
            <Center>
              {hasVideo ? (
                <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
              ) : (
                <Center minH="7rem" w="100%">
                  <VStack>
                    <Text color="#ffffff">{`The Intern has not uploaded any video yet.`}</Text>
                    <Text color="#ffffff">{`Once they do, it will appear here!`}</Text>
                  </VStack>
                </Center>
              )}
            </Center>
          </Card>
        </Center>
      </VStack>
    </Box>
  )
}

export default Header
