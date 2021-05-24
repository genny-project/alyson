import { Avatar } from '@chakra-ui/avatar'
import { IconButton } from '@chakra-ui/button'
import { Box, Center, Flex, HStack, Spacer } from '@chakra-ui/layout'
import { faEllipsisH, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useApi from 'api'
import Attribute from 'app/BE/attribute'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from 'redux/app'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import DetailActions from './Actions'

const DetailHeader = ({ sbeCode, beCode, mini }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const isMobile = useIsMobile()

  const { value } = useSelector(selectCode(beCode, 'PRI_IMAGE_URL')) || {}

  const src = useApi().getImageSrc(value)

  if (isMobile)
    return (
      <Card p="3" w="full" position="absolute" zIndex="modal">
        <Flex>
          <HStack>
            <Avatar src={src} />
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
          </HStack>
          <Spacer />
          <HStack>
            <Button size="sm" leftIcon={<FontAwesomeIcon icon={faPlus} />}>
              Apply
            </Button>
            <IconButton size="sm" icon={<FontAwesomeIcon icon={faEllipsisH} />} />
            <IconButton
              onClick={onClose}
              size="sm"
              variant="ghost"
              icon={<FontAwesomeIcon icon={faTimes} />}
            />
          </HStack>
        </Flex>
      </Card>
    )
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
        <Flex>
          <HStack>
            <Avatar src={src} />
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
          </HStack>
          <Spacer />
          <HStack>
            <DetailActions beCode={beCode} sbeCode={sbeCode} />
            <IconButton
              onClick={onClose}
              size="sm"
              variant="ghost"
              icon={<FontAwesomeIcon icon={faTimes} />}
            />
          </HStack>
        </Flex>
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
          <Card minH="15rem" p={0} w="full" bg="gradient.900" overflow="hidden">
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
    </Box>
  )
}

export default DetailHeader
