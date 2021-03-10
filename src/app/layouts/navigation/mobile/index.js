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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 3,
          width: '100%',
          maxWidth: '100vw',
          left: 0,
          right: 0,
          backgroundColor: bg,
          transition: 'box-shadow 0.2s',
          boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 2px 0px',
          borderBottom: '1px solid lightgrey',
        }}
      >
        <Flex p="3">
          <IconButton onClick={onOpen} variant="ghost" size="lg">
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <Spacer />
          <Center mr="-125px" style={{ cursor: 'pointer' }}>
            {apiConfig && (
              <Image
                onClick={() =>
                  onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
                }
                ref={btnRef}
                src={logoSrc}
                htmlWidth="250px"
              />
            )}
          </Center>
          <Spacer />
          <HStack>
            <AskMenu questionCode={'QUE_ADD_ITEMS_GRP'} icon={<FontAwesomeIcon icon={faPlus} />} />
            <AskMenu
              questionCode={'QUE_QUICK_ADD_ITEMS_GRP'}
              icon={<FontAwesomeIcon icon={faBolt} />}
            />
            <Avatar />
          </HStack>
        </Flex>
      </header>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader />
            <DrawerBody mt="4">
              <Buttons onClose={onClose} questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileNav
