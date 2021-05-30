import { Avatar } from '@chakra-ui/avatar'
import { IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Center, Fade, Flex, HStack, Spacer, VStack } from '@chakra-ui/react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useApi from 'api'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { identity } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from 'redux/app'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import DetailActions from './Actions'

const DetailHeader = ({ sbeCode, beCode, mini }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  const { value } = useSelector(selectCode(beCode, 'PRI_IMAGE_URL')) || {}

  const isMobile = useIsMobile()
  const src = useApi().getImageSrc(value)

  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()

  const hasVideo = !!useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))?.value

  return (
    <Box>
      <Card
        px="8"
        display={mini ? 'block' : 'none'}
        p="5"
        w="full"
        position="absolute"
        zIndex="modal"
      >
        <VStack align="start" w="full">
          <Flex w="full">
            <HStack>
              <Box bg={hasVideo ? 'gradient.200' : ''} p="1" borderRadius="50%">
                <Avatar onClick={hasVideo ? onOpen : identity} size="lg" src={src} />
              </Box>

              <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
            </HStack>
            <Spacer />
            <HStack>
              {!isMobile && <DetailActions beCode={beCode} sbeCode={sbeCode} />}
              <IconButton
                onClick={onClose}
                size="sm"
                variant="ghost"
                icon={<FontAwesomeIcon icon={faTimes} />}
              />
            </HStack>
          </Flex>
          <HStack display={isMobile ? 'block' : 'none'} w="full">
            <DetailActions beCode={beCode} sbeCode={sbeCode} />
          </HStack>
        </VStack>
      </Card>

      <Box
        display={!mini ? 'block' : 'none'}
        w="full"
        position="absolute"
        zIndex="modal"
        overflow="hidden"
        p="5"
      >
        <Box
          p="0"
          overflow="hidden"
          borderRadius="50%"
          position="absolute"
          zIndex="modal"
          right="10"
          top="10"
        >
          <IconButton
            onClick={onClose}
            size="sm"
            variant="unstyled"
            color="white"
            icon={<FontAwesomeIcon opacity={50} icon={faTimes} />}
          />
        </Box>
        <Center w="full">
          <Card minH="10rem" p={0} w="full" bg="gradient.900" overflow="hidden">
            <Center w="full">
              <Box maxW="30vw">
                <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
              </Box>
            </Center>
          </Card>
        </Center>

        <Flex w="full">
          <Box>
            <Avatar
              bg="white"
              ml="2vw"
              mt="-2rem"
              p="4px"
              src={src}
              w="8rem"
              h="8rem"
              zIndex="modal"
            />
          </Box>
          <HStack ml="5">
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
          </HStack>

          <Spacer />
          <DetailActions beCode={beCode} sbeCode={sbeCode} />
        </Flex>
      </Box>
      <Box
        position="absolute"
        zIndex="modal"
        w="100vw"
        h="100vh"
        display={isOpen ? 'block' : 'none'}
        bg="blackAlpha.800"
      >
        <Fade in={isOpen}>
          <VStack w="full">
            <Flex w="full">
              <Spacer />
              <IconButton
                m="3"
                colorScheme="primary"
                onClick={onCloseModal}
                icon={<FontAwesomeIcon icon={faTimes} />}
              />
            </Flex>
            <Box w="full">
              <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
            </Box>
          </VStack>
        </Fade>
      </Box>
    </Box>
  )
}

export default DetailHeader
