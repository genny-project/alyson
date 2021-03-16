import { useRef } from 'react'
import AskMenu from 'app/ASKS/menu'
import {
  Drawer,
  Flex,
  Spacer,
  Image,
  HStack,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  useTheme,
  useDisclosure,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  IconButton,
  Center,
  Text,
} from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import Avatar from '../Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBolt, faBars } from '@fortawesome/free-solid-svg-icons'
import Buttons from 'app/ASKS/buttons'
import { onSendMessage } from 'vertx'

const MobileNav = ({ logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <header
        style={{
          color,
          position: 'fixed',
          top: 0,
          zIndex: 3,
          width: '100%',
          maxWidth: '100vw',
          left: 0,
          right: 0,
          backgroundColor: bg,
          boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 0px 0px',
        }}
      >
        <nav>
          <Flex p="3">
            <IconButton color="gray.600" onClick={onOpen} variant="ghost">
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
            <Spacer />
            <Center mr="-125px" style={{ cursor: 'pointer' }}>
              {apiConfig && (
                <Image
                  opacity="0.8"
                  onClick={() =>
                    onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
                  }
                  ref={btnRef}
                  src={logoSrc}
                  htmlWidth="200px"
                />
              )}
            </Center>
            <Spacer />
            <HStack w="144px">
              <AskMenu
                questionCode={'QUE_ADD_ITEMS_GRP'}
                icon={<FontAwesomeIcon icon={faPlus} />}
              />
              <AskMenu
                questionCode={'QUE_QUICK_ADD_ITEMS_GRP'}
                icon={<FontAwesomeIcon icon={faBolt} />}
              />
              <Avatar />
            </HStack>
          </Flex>
        </nav>
      </header>
      <Drawer
        preserveScrollBarGap
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader />
            <DrawerBody mt="4">
              <Buttons onClick={onClose} questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
              <Text as="samp" fontSize="xs" style={{ position: 'absolute', bottom: 5 }}>
                Powered By GADA Technology
              </Text>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileNav
