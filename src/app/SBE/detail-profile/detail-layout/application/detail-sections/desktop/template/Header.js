import { isEmpty } from 'ramda'
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

const Header = ({ beCode }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  const videoSrc = useSelector(selectCode(beCode, '_PRI_INTERN_CODE__PRI_VIDEO_URL'))?.value
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

export default Header
