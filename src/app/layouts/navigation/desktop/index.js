import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  useColorModeValue,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react'
import { addItemsQuestionCode, dashboardViewQuestion } from 'utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { SIDEBAR_WIDTH } from 'utils/constants'

import AskMenu from 'app/ASKS/menu'
import Avatar from '../Avatar'
import Drafts from '../drafts/Drafts'
import { onSendMessage } from 'vertx'

const DesktopNav = () => {
  const theme = useTheme()
  const bg = useColorModeValue('#F6F6F6', theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const { onClose } = useDisclosure()

  return (
    <>
      <header
        style={{
          color,
          position: 'fixed',
          top: 0,
          zIndex: 9999,
          maxWidth: '100vw',
          left: SIDEBAR_WIDTH,
          right: 0,
          backgroundColor: bg,
          h: 25,
          boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 0px 0px',
        }}
      >
        <nav>
          <Flex align="center" p="3">
            <Box mx={5} alignItems="center" m="auto">
              <HStack marginLeft="8" spacing="5">
                <Box
                  onClick={() =>
                    onSendMessage({
                      code: dashboardViewQuestion,
                      parentCode: dashboardViewQuestion,
                    })
                  }
                >
                  <FontAwesomeIcon size="lg" icon={faHome} cursor="pointer" color="#234371" />
                </Box>
                <FontAwesomeIcon size="lg" icon={faSearch} cursor="pointer" color="#234371" />
              </HStack>
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
    </>
  )
}

export default DesktopNav
