import { isEmpty, equals } from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Center, Text, VStack } from '@chakra-ui/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '@chakra-ui/react'

import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { closeDrawer } from 'redux/app'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import sameLength from 'redux/utils/same-length'

const DefaultTemplate = ({ beCode, onClose, userType }) => {
  const videoSrc = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))?.value
  const hasVideo = !isEmpty(videoSrc)
  return (
    <>
      <Center w="full">
        <Card minH="10rem" p={0} w="full" bg="#1A365D" overflow="hidden" borderRadius="2rem">
          <Center w="full">
            {hasVideo ? (
              <Box maxW="30vw">
                <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
              </Box>
            ) : (
              <Center minH="10rem" w="100%">
                {userType === 'INTERN' ? (
                  <VStack>
                    <Text textStyle="head.2" color="#ffffff">
                      {`Profile with videos have higher chances of landing an internship.`}
                    </Text>
                    <Text textStyle="head.2" color="#ffffff">
                      {`Please upload your video!`}
                    </Text>
                  </VStack>
                ) : (
                  <VStack>
                    <Text textStyle="head.2" color="#ffffff">
                      {`The Intern has not uploaded any video yet`}
                    </Text>
                    <Text textStyle="head.2" color="#ffffff">
                      {`Once they do, it will appear here!`}
                    </Text>
                  </VStack>
                )}
              </Center>
            )}
          </Center>
        </Card>
      </Center>
      <Box
        overflow="hidden"
        borderRadius="50%"
        position="absolute"
        zIndex="modal"
        right="12"
        top="6"
      >
        <IconButton
          onClick={onClose}
          size="sm"
          color="#1A365D"
          bg="white"
          icon={<FontAwesomeIcon opacity={50} icon={faTimes} />}
        />
      </Box>
    </>
  )
}

const TemplateOne = ({ beCode, onClose, userType, mappedPcm }) => {
  const { PRI_LOC11 } = mappedPcm
  const videoSrc = useSelector(selectCode(beCode, PRI_LOC11))?.value
  const hasVideo = !isEmpty(videoSrc)

  return (
    <>
      <Center w="full">
        <Card minH="10rem" p={0} w="full" bg="#1A365D" overflow="hidden" borderRadius="2rem">
          <Center w="full">
            {hasVideo ? (
              <Box maxW="30vw">
                <Attribute code={beCode} attribute={PRI_LOC11} />
              </Box>
            ) : (
              <Center minH="10rem" w="100%">
                {userType === 'INTERN' ? (
                  <VStack>
                    <Text textStyle="head.2" color="#ffffff">
                      {`Profile with videos have higher chances of landing an internship.`}
                    </Text>
                    <Text textStyle="head.2" color="#ffffff">
                      {`Please upload your video!`}
                    </Text>
                  </VStack>
                ) : (
                  <VStack>
                    <Text textStyle="head.2" color="#ffffff">
                      {`The Intern has not uploaded any video yet`}
                    </Text>
                    <Text textStyle="head.2" color="#ffffff">
                      {`Once they do, it will appear here!`}
                    </Text>
                  </VStack>
                )}
              </Center>
            )}
          </Center>
        </Card>
      </Center>
      <Box
        overflow="hidden"
        borderRadius="50%"
        position="absolute"
        zIndex="modal"
        right="12"
        top="6"
      >
        <IconButton
          onClick={onClose}
          size="sm"
          color="#1A365D"
          bg="white"
          icon={<FontAwesomeIcon opacity={50} icon={faTimes} />}
        />
      </Box>
    </>
  )
}

const Header = ({ beCode, pcm, mappedPcm }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  const userCode = useSelector(selectCode('USER'), equals)
  const userType = getUserType(useSelector(selectCode(userCode), sameLength))

  if (pcm) {
    return (
      <TemplateOne beCode={beCode} mappedPcm={mappedPcm} onClose={onClose} userType={userType} />
    )
  }

  return <DefaultTemplate beCode={beCode} onClose={onClose} userType={userType} />
}

export default Header
