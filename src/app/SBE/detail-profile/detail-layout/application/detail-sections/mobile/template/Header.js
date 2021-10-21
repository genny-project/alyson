import 'app/layouts/components/css/hide-scroll.css'

import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import DetailActions from 'app/SBE/detail-profile/detail-layout/application/templates/Actions.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@chakra-ui/react'
import { LeftDetailAttributesApplication } from 'app/SBE/detail-profile/detail-layout/application/templates/AttributesList.js'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'
import { closeDrawer } from 'redux/app'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { map } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useColorModeValue } from '@chakra-ui/color-mode'

const Header = ({ beCode, sbeCode }) => {
  const cardBg = useColorModeValue('#ffffff', 'gray.600')
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const videoSrc = useSelector(selectCode(beCode, '_LNK_INTERNSHIP__PRI_VIDEO_URL'))?.value

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
        <Attribute
          code={beCode}
          config={{ h: '5rem', w: '5rem' }}
          attribute="_PRI_INTERN_CODE__PRI_IMAGE_URL_"
        />
        <VStack align="start" spacing={2}>
          <HStack spacing={4} pt={2}>
            <Attribute
              config={{ textStyle: 'body.1' }}
              code={beCode}
              attribute="_PRI_INTERN_CODE__PRI_NAME"
            />
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
            ))(LeftDetailAttributesApplication)}
          </VStack>
        </VStack>
        <Center w="full">
          <Card p={0} w="full" bg="#1A365D" overflow="hidden" maxH="15rem">
            <Center>
              {!!videoSrc ? (
                <Attribute code={beCode} attribute="_LNK_INTERNSHIP__PRI_VIDEO_URL" />
              ) : (
                <Center minH="7rem" w="100%">
                  <VStack>
                    <Text textStyle="head.2" color="#ffffff">
                      {`Intertnship video has not been uploaded`}
                    </Text>
                    <Text textStyle="head.2" color="#ffffff">
                      {`Once it is, it will appear here!`}
                    </Text>
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
