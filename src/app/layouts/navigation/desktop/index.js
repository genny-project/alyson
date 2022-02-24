import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  useColorModeValue,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react'
import { addItemsQuestionCode, dashboardViewQuestion } from 'utils/constants'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { SIDEBAR_WIDTH } from 'utils/constants'

import AskMenu from 'app/ASKS/menu'
import Avatar from '../Avatar'
import Drafts from '../drafts/Drafts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiConfig } from 'config/get-api-config'
import { onSendMessage } from 'vertx'
import { useGetRealm } from 'utils/hooks'
import { useRef } from 'react'

const DesktopNav = ({ logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const { onClose } = useDisclosure()
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
          maxWidth: '100vw',
          left: SIDEBAR_WIDTH,
          right: 0,
          backgroundColor: bg,
          boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 0px 0px',
        }}
      >
        <nav>
          <Flex align="center" p="3">
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
    </>
  )
}

export default DesktopNav
