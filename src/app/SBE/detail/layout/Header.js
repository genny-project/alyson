import { Avatar } from '@chakra-ui/avatar'
import { IconButton } from '@chakra-ui/button'
import { Box, Center, Flex, HStack, Spacer, VStack } from '@chakra-ui/layout'
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

const DetailHeader = ({ beCode, mini }) => {
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
      <Card display={mini ? 'block' : 'none'} p="5" w="full" position="absolute" zIndex="modal">
        <Flex>
          <HStack>
            <Avatar src={src} />
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
          </HStack>
          <Spacer />
          <HStack>
            <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>Apply</Button>
            <IconButton icon={<FontAwesomeIcon icon={faEllipsisH} />} />
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
      >
        <Center w="full">
          <Card p={0} w="full" bg="gradient.900" h="full" borderBottomRadius={0}>
            <Center w="full">
              <Box w="40%">
                <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
              </Box>
            </Center>
          </Card>
        </Center>

        <Box>
          <Avatar
            ml="10rem"
            mt="-4rem"
            bg="white"
            p="4px"
            src={src}
            w="8rem"
            h="8rem"
            zIndex="modal"
          />
        </Box>
        <VStack spacing={0}>
          {/* <Box>
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
        </Box> */}
        </VStack>
      </Box>
    </Box>
  )
}

export default DetailHeader
