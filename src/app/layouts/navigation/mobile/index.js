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
} from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import Avatar from '../Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBolt } from '@fortawesome/free-solid-svg-icons'
import Buttons from 'app/ASKS/buttons'

const MobileNav = () => {
  const theme = useTheme()
  const bg = useColorModeValue('white', theme.colors.primary[900])
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
        }}
      >
        <Flex p="3">
          {apiConfig && (
            <Image
              onClick={onOpen}
              ref={btnRef}
              src={apiConfig.PRI_FAVICON}
              style={{ cursor: 'pointer' }}
            />
          )}
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
            <DrawerHeader>{apiConfig.PRI_NAME}</DrawerHeader>
            <DrawerBody>
              <Buttons direction="column" size="lg" questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileNav
