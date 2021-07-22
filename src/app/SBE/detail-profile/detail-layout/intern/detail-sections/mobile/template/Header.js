import { map, isEmpty, equals } from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import { VStack, HStack, Box, Center, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '@chakra-ui/react'

import DetailActions from 'app/SBE/detail-profile/detail-layout/intern/templates/Actions.js'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { LeftDetailAttributesIntern } from 'app/SBE/detail-profile/detail-layout/intern/templates/AttributesList.js'
import { closeDrawer } from 'redux/app'
import 'app/layouts/components/css/hide-scroll.css'
import Card from 'app/layouts/components/card'
import { selectCode } from 'redux/db/selectors'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'
import getUserType from 'utils/helpers/get-user-type'
import sameLength from 'redux/utils/same-length'

const Header = ({ beCode, sbeCode }) => {
  const userCode = useSelector(selectCode('USER'), equals)
  const userType = getUserType(useSelector(selectCode(userCode), sameLength))

  const cardBg = useColorModeValue('#ffffff', 'gray.600')
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const videoSrc = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))?.value
  const hasVideo = !isEmpty(videoSrc)

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
        <Attribute code={beCode} config={{ h: '5rem', w: '5rem' }} attribute="PRI_IMAGE_URL" />
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
              />
            ))(LeftDetailAttributesIntern)}
          </VStack>
        </VStack>
        <Center w="full">
          <Card p={0} w="full" bg="#1A365D" overflow="hidden" maxH="15rem">
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
