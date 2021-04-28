import { useRef } from 'react'
import AskMenu from 'app/ASKS/menu'
import { Flex, Spacer, Image, HStack, useColorModeValue, useTheme, Box } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import Avatar from '../Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBolt } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Drafts from '../drafts/Drafts'
import Views from './Views'

const DesktopNav = ({ logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const btnRef = useRef()

  return (
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
        <Flex px="3" pb="1.5" pt="4">
          <Views />
          <Spacer />
          <Box cursor="pointer" position="absolute" right="50vw" mr="-125px" mt="-3px">
            {apiConfig && (
              <Image
                opacity="0.8"
                onClick={() =>
                  onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
                }
                ref={btnRef}
                src={logoSrc}
                htmlWidth="250px"
              />
            )}
          </Box>
          <Spacer />
          <HStack spacing={10}>
            <AskMenu questionCode={'QUE_ADD_ITEMS_GRP'} icon={<FontAwesomeIcon icon={faPlus} />} />
            <AskMenu
              questionCode={'QUE_QUICK_ADD_ITEMS_GRP'}
              icon={<FontAwesomeIcon icon={faBolt} />}
            />
            <Drafts />
            <Box mr="4">
              <Avatar />
            </Box>
          </HStack>
        </Flex>
      </nav>
    </header>
  )
}

export default DesktopNav
