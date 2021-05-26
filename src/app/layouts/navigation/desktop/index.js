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
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import { caps, hideQuickAdd } from 'config/caps'

const DesktopNav = ({ logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

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
        <Flex pr={8} py={2}>
          <Box cursor="pointer" px={8}>
            {apiConfig && (
              <Box
                w="55px"
                onClick={() =>
                  onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
                }
              >
                <Image ref={btnRef} src={'/favicon.png'} />
              </Box>
            )}
          </Box>
          <Views />
          <Spacer />
          <HStack spacing={10}>
            <AskMenu questionCode={'QUE_ADD_ITEMS_GRP'} icon={<FontAwesomeIcon icon={faPlus} />} />
            {!caps(userType)(hideQuickAdd) && (
              <AskMenu
                questionCode={'QUE_QUICK_ADD_ITEMS_GRP'}
                icon={<FontAwesomeIcon icon={faBolt} />}
              />
            )}
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
