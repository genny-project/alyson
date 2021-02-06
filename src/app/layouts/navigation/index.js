import Buttons from 'app/ASKS/buttons'
import AskMenu from 'app/ASKS/menu'
import {
  Flex,
  Spacer,
  Image,
  Center,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import Avatar from './Avatar'
import Search from './Search'
import ColorToggler from './ColorToggler'
import { onSendMessage } from 'vertx'

const Navigation = () => {
  const showImage = useBreakpointValue({ base: false, lg: true })
  const theme = useTheme()

  const bg = useColorModeValue('white', theme.colors.teal[900])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 3,
        width: '100%',
        left: 0,
        right: 0,
        backgroundColor: bg,
        transition: 'box-shadow 0.2s',
        borderTop: '6px solid',
        borderTopColor: '#38B2AC',
        boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 2px 0px',
      }}
    >
      <Flex p="3">
        {showImage && apiConfig?.realm === 'internmatch' && (
          <Image
            onClick={() =>
              onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
            }
            w="220px"
            src={`/internMatchLogo.png`}
            style={{ cursor: 'pointer' }}
          />
        )}
        <Spacer />
        <Buttons questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
        <Spacer />
        <Center>
          {/* <Search /> */}
          <ColorToggler />
        </Center>
        <Spacer />
        <HStack>
          <AskMenu questionCode={'QUE_ADD_ITEMS_GRP'} />
          <Avatar />
        </HStack>
      </Flex>
    </header>
  )
}

export default Navigation
