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
import { reduce } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { find, includes } from 'ramda'

//get this mapped object from the backend and replace the hardcoded object.

const TemplateOne = ({ logoSrc, userType, realm, mappedPcm }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)
  const btnRef = useRef()

  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

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
              <Box onClick={() => onSendMessage({ code: PRI_LOC1, parentCode: PRI_LOC1 })}>
                <Image ref={btnRef} src={logoSrc} htmlWidth={logoWidth} />
              </Box>
            )}
          </Box>
          <Spacer />
          <HStack spacing={10}>
            <AskMenu questionCode={PRI_LOC2} icon={<FontAwesomeIcon icon={faPlus} />} />
            {!caps(userType)(hideQuickAdd) && (
              <AskMenu
                questionCode={quickAddItemsQuestionCode}
                icon={<FontAwesomeIcon icon={faBolt} />}
              />
            )}
            <Drafts code={PRI_LOC3} />
            <Box mr="4">
              <Avatar code={PRI_LOC4} />
            </Box>
          </HStack>
        </Flex>
      </nav>
    </header>
  )
}

const TemplateTwo = ({ logoSrc, userType, realm, mappedPcm }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)
  const btnRef = useRef()

  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

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
              <Box onClick={() => onSendMessage({ code: PRI_LOC1, parentCode: PRI_LOC1 })}>
                <Image ref={btnRef} src={logoSrc} htmlWidth={logoWidth} />
              </Box>
            )}
          </Box>
          <Spacer />
          <HStack spacing={10}>
            <AskMenu questionCode={PRI_LOC2} icon={<FontAwesomeIcon icon={faPlus} />} />
            {!caps(userType)(hideQuickAdd) && (
              <AskMenu
                questionCode={quickAddItemsQuestionCode}
                icon={<FontAwesomeIcon icon={faBolt} />}
              />
            )}
            <Drafts code={PRI_LOC3} />
            <Box mr="4">
              <Avatar code={PRI_LOC4} />
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
            <Drafts code={`QUE_DRAFTS_GRP`} />

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

  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []

  const headerPcmCode = find(includes('_HEADER'))(allPcmCode)

  const headerPcm = useSelector(selectCode(headerPcmCode, 'allAttributes'))
  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(headerPcm || [])

  const { PRI_TEMPLATE_CODE: code } = mappedPcm

  if (headerPcm && userType === 'AGENT') {
    if (code === 'TPL_NORTH') return <Default logoSrc={logoSrc} userType={userType} realm={realm} />

    if (code === 'TPL_NORTH_TWO')
      return (
        <TemplateTwo logoSrc={logoSrc} userType={userType} realm={realm} mappedPcm={mappedPcm} />
      )
  }

  return <Default logoSrc={logoSrc} userType={userType} realm={realm} />
}

export default DesktopNav
