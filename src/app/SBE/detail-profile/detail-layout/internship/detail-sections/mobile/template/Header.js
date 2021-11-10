import 'app/layouts/components/css/hide-scroll.css'

import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import {
  LeftDetailAttributesInternship,
  LeftDetailAttributesInternshipInternView,
} from 'app/SBE/detail-profile/detail-layout/internship/templates/AttributesList.js'
import { isEmpty, map } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import DetailActions from 'app/SBE/detail-profile/detail-layout/internship/templates/Actions.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@chakra-ui/react'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'
import { closeDrawer } from 'redux/app'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import getUserType from 'utils/helpers/get-user-type'
import { selectCode } from 'redux/db/selectors'
import { useColorModeValue } from '@chakra-ui/color-mode'

const Header = ({ beCode, sbeCode }) => {
  const cardBg = useColorModeValue('#ffffff', 'gray.600')
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const videoSrc = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))?.value
  const hasVideo = !isEmpty(videoSrc)

  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

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
          <Attribute code={beCode} attribute="PRI_STAR_RATING" />
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
        <Center w="full">
          <Card p={0} w="full" bg="#1A365D" overflow="hidden" maxH="15rem">
            <Center>
              {hasVideo ? (
                <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
              ) : (
                <Center minH="7rem" w="100%">
                  <VStack>
                    <Text color="#ffffff">{`Internship Video has not been uploaded`}</Text>
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
