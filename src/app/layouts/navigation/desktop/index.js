import { Box, Flex, HStack, Image, Spacer, useColorModeValue, useTheme } from '@chakra-ui/react'
import { addItemsQuestionCode, quickAddItemsQuestionCode } from 'utils/constants'
import { caps, hideQuickAdd } from 'config/caps'
import { faBolt, faPlus } from '@fortawesome/free-solid-svg-icons'

import AskMenu from 'app/ASKS/menu'
import Avatar from '../Avatar'
import Drafts from '../drafts/Drafts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Views from './Views'
import { apiConfig } from 'config/get-api-config'
import { onSendMessage } from 'vertx'
import { useGetRealm } from 'utils/hooks'
import { useRef } from 'react'
import useUserType from 'utils/helpers/user-type'

//get the pcm type from the backend and replace the hardcoded value.
const pcmType = 'TemplateOne'

//get this mapped object from the backend and replace the hardcoded object.
const mapped = {
  LOCATION_ONE: 'QUE_DASHBOARD_VIEW',
  LOCATION_TWO: 'QUE_ADD_ITEMS_GRP',
  LOCATION_THREE: 'QUE_DRAFTS_GRP',
  LOCATION_FOUR: 'QUE_AVATAR_GRP',
}

const TemplateOne = ({ logoSrc, userType, realm }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)
  const btnRef = useRef()

  const { LOCATION_ONE, LOCATION_TWO, LOCATION_THREE, LOCATION_FOUR } = mapped

  const logoWidth =
    realm === 'mentormatch'
      ? '140px'
      : realm === 'internmatch'
      ? '55px'
      : realm === 'credmatch'
      ? '140px'
      : '55px'

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
              <Box onClick={() => onSendMessage({ code: LOCATION_ONE, parentCode: LOCATION_ONE })}>
                <Image ref={btnRef} src={logoSrc} htmlWidth={logoWidth} />
              </Box>
            )}
          </Box>
          <Spacer />
          <HStack spacing={10}>
            <AskMenu questionCode={LOCATION_TWO} icon={<FontAwesomeIcon icon={faPlus} />} />
            {!caps(userType)(hideQuickAdd) && (
              <AskMenu
                questionCode={quickAddItemsQuestionCode}
                icon={<FontAwesomeIcon icon={faBolt} />}
              />
            )}
            <Drafts code={LOCATION_THREE} />
            <Box mr="4">
              <Avatar code={LOCATION_FOUR} />
            </Box>
          </HStack>
        </Flex>
      </nav>
    </header>
  )
}

const Default = ({ logoSrc, userType, realm }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const btnRef = useRef()

  const logoWidth =
    realm === 'mentormatch'
      ? '140px'
      : realm === 'internmatch'
      ? '55px'
      : realm === 'credmatch'
      ? '140px'
      : '55px'

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
                onClick={() =>
                  onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
                }
              >
                <Image ref={btnRef} src={logoSrc} htmlWidth={logoWidth} />
              </Box>
            )}
          </Box>
          <Views />

          <Spacer />
          <HStack spacing={10}>
            <AskMenu questionCode={addItemsQuestionCode} icon={<FontAwesomeIcon icon={faPlus} />} />
            {!caps(userType)(hideQuickAdd) && (
              <AskMenu
                questionCode={quickAddItemsQuestionCode}
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

const DesktopNav = ({ logoSrc }) => {
  const userType = useUserType()

  const realm = useGetRealm()

  return userType === 'AGENT' && pcmType === 'TemplateOne' ? (
    <TemplateOne logoSrc={logoSrc} userType={userType} realm={realm} />
  ) : (
    <Default logoSrc={logoSrc} userType={userType} realm={realm} />
  )
}

export default DesktopNav
