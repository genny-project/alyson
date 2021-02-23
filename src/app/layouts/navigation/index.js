import Buttons from 'app/ASKS/buttons'
import AskMenu from 'app/ASKS/menu'
import {
  Flex,
  Spacer,
  Image,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  useTheme,
  Center,
} from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import Avatar from './Avatar'
import { onSendMessage } from 'vertx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBolt } from '@fortawesome/free-solid-svg-icons'
import MobileNav from './mobile'

const Navigation = () => {
  const mobile = useBreakpointValue({ base: true, lg: false })
  const theme = useTheme()

  const bg = useColorModeValue('white', theme.colors.teal[900])

  if (mobile) return <MobileNav />

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
        boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 2px 0px',
      }}
    >
      <Flex p="3">
        {apiConfig && (
          <Image
            onClick={() =>
              onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
            }
            src={apiConfig.PRI_FAVICON}
            style={{ cursor: 'pointer' }}
          />
        )}
        <Spacer />
        <Center>
          <Buttons questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
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
  )
}

export default Navigation
