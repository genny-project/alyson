import { useRef } from 'react'
import { includes } from 'ramda'
import { Flex, Spacer, Image, HStack, useColorModeValue, useTheme, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBolt } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

import AskMenu from 'app/ASKS/menu'
import { apiConfig } from 'config/get-api-config'
import Avatar from '../Avatar'
import { onSendMessage } from 'vertx'
import Drafts from '../drafts/Drafts'
import Views from './Views'
import getUserType from 'utils/helpers/get-user-type'
import { selectCode } from 'redux/db/selectors'

const DesktopNav = ({ logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const btnRef = useRef()

  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  const hideQuickAdd = ['HOST_CPY_REP']

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
              <Image
                onClick={() =>
                  onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
                }
                ref={btnRef}
                src={logoSrc}
                htmlWidth="80px"
              />
            )}
          </Box>
          <Views />
          <Spacer />
          <HStack spacing={10}>
            <AskMenu questionCode={'QUE_ADD_ITEMS_GRP'} icon={<FontAwesomeIcon icon={faPlus} />} />
            {!includes(userType)(hideQuickAdd) && (
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
