import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react'
import { addItemsQuestionCode, dashboardViewQuestion } from 'utils/constants'
import { caps, hideQuickAdd } from 'config/caps'
import { faBars, faBolt, faPlus } from '@fortawesome/free-solid-svg-icons'

import AskMenu from 'app/ASKS/menu'
import Avatar from '../Avatar'
import Buttons from 'app/ASKS/buttons'
import Drafts from '../drafts/Drafts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiConfig } from 'config/get-api-config'
import getUserType from 'utils/helpers/get-user-type'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useGetRealm } from 'utils/hooks'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

const MobileNav = ({ logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const realm = useGetRealm()

  const logoWidth =
    realm === 'mentormatch'
      ? '120px'
      : realm === 'internmatch'
      ? '45px'
      : realm === 'credmatch'
      ? '120px'
      : '45px'

  return (
    <>
      <header
        style={{
          color,
          position: 'fixed',
          top: 0,
          zIndex: 9999,
          width: '100%',
          maxWidth: '100vw',
          left: 0,
          right: 0,
          backgroundColor: bg,
        }}
      >
        <nav>
          <Flex align="center" p="3">
            <IconButton color="gray.600" onClick={onOpen} variant="ghost">
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
            <Box mx={5} alignItems="center" m="auto">
              {apiConfig && (
                <Image
                  onClick={() =>
                    onSendMessage({
                      code: dashboardViewQuestion,
                      parentCode: dashboardViewQuestion,
                    })
                  }
                  ref={btnRef}
                  src={logoSrc}
                  htmlWidth={logoWidth}
                />
              )}
            </Box>
            <Spacer />
            <HStack spacing={5}>
              <AskMenu
                onClose={onClose}
                questionCode={addItemsQuestionCode}
                icon={<Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>Add</Button>}
              />
              <Drafts />
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
            <DrawerHeader>
              <HStack spacing="5">
                {!caps(userType)(hideQuickAdd) && (
                  <AskMenu
                    onClose={onClose}
                    questionCode={'QUE_QUICK_ADD_ITEMS_GRP'}
                    icon={<Button leftIcon={<FontAwesomeIcon icon={faBolt} />}>Quick Add</Button>}
                  />
                )}
              </HStack>
            </DrawerHeader>
            <DrawerBody mt="4">
              <Buttons onClick={onClose} questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
              <Text textStyle="tail.2" style={{ position: 'absolute', bottom: 5 }}>
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
