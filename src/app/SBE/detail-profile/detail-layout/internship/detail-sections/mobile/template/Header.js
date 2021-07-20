import { map, isEmpty } from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import { VStack, HStack, Box, Center, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '@chakra-ui/react'

import DetailActions from 'app/SBE/detail-profile/detail-layout/internship/templates/Actions.js'
import { LeftDetailAttributesInternship } from 'app/SBE/detail-profile/detail-layout/internship/templates/AttributesList.js'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { closeDrawer } from 'redux/app'
import 'app/layouts/components/css/hide-scroll.css'
import Card from 'app/layouts/components/card'
import { selectCode } from 'redux/db/selectors'

const Header = ({ beCode, sbeCode }) => {
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
          <Attribute code={beCode} attribute="PRI_STAR_RATING" />
          <DetailActions beCode={beCode} sbeCode={sbeCode} />
          <VStack align="start" spacing={4} py={4}>
            {map(({ icon, attr, attrSecond, config }) => {
              return (
                <HStack align="start" spacing={4}>
                  <FontAwesomeIcon icon={icon} opacity="0.6" />
                  <Attribute code={beCode} attribute={attr} config={config} />
                  {attrSecond && <Attribute code={beCode} attribute={attrSecond} config={config} />}
                </HStack>
              )
            })(LeftDetailAttributesInternship)}
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
                    <Text color="#ffffff">
                      {`Internship Video has not been uploaded for this internship`}
                    </Text>
                    <Text color="#ffffff">{`Once it is, it will appear here!`}</Text>
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
