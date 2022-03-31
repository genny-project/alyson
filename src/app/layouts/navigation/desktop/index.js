import {
  Box,
  Button,
  Image,
  Flex,
  HStack,
  Spacer,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react'
import { addItemsQuestionCode, dashboardViewQuestion } from 'utils/constants'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { find, includes, reduce } from 'ramda'

import AskMenu from 'app/ASKS/menu'
import Avatar from '../Avatar'
import Drafts from '../drafts/Drafts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { apiConfig } from 'config/get-api-config'
import { LOGO_WIDTH } from 'utils/constants'

const DefaultTemplate = ({ bg, color, logoSrc }) => {
  return (
    <>
      <header
        style={{
          color,
          position: 'fixed',
          top: 0,
          zIndex: 9999,
          maxWidth: '100vw',
          left: 0,
          right: 0,
          backgroundColor: bg,
          h: 25,
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
                  src={logoSrc}
                  htmlWidth={LOGO_WIDTH}
                />
              )}
            </Box>
            <Spacer />
            <HStack spacing={8} marginRight="5">
              <AskMenu
                questionCode={addItemsQuestionCode}
                icon={
                  <Button
                    bg="#234371"
                    leftIcon={<FontAwesomeIcon icon={faPlus} color="#234371" />}
                  >{`Add`}</Button>
                }
              />
              <Drafts code={'QUE_DRAFTS_GRP'} />
              <Avatar code={'QUE_AVATAR_GRP'} />
            </HStack>
          </Flex>
        </nav>
      </header>
    </>
  )
}

const TemplateOne = ({ bg, color, mappedPcm, logoSrc }) => {
  const { PRI_LOC3, PRI_LOC4, PRI_LOC5 } = mappedPcm

  return (
    <>
      <header
        style={{
          color,
          position: 'fixed',
          top: 0,
          zIndex: 9999,
          maxWidth: '100vw',
          left: 0,
          right: 0,
          backgroundColor: bg,
          h: 25,
          boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 0px 0px',
        }}
      >
        <nav>
          <Flex align="center" p="3">
            {/* These are hiiden as for now as they dont have actions. */}
            {/* <Box mx={5} alignItems="center" m="auto">
              <HStack marginLeft="8" spacing="5">
                <Box
                  onClick={() =>
                    onSendMessage({
                      code: PRI_LOC1,
                      parentCode: PRI_LOC1,
                    })
                  }
                >
                  <FontAwesomeIcon size="lg" icon={faHome} cursor="pointer" color="#234371" />
                </Box>
                <FontAwesomeIcon size="lg" icon={faSearch} cursor="pointer" color="#234371" />
              </HStack>
            </Box> */}
            <Box mx={5} alignItems="center" m="auto">
              {apiConfig && (
                <Image
                  onClick={() =>
                    onSendMessage({
                      code: dashboardViewQuestion,
                      parentCode: dashboardViewQuestion,
                    })
                  }
                  src={logoSrc}
                  htmlWidth={LOGO_WIDTH}
                />
              )}
            </Box>
            <Spacer />
            <HStack spacing={8} marginRight="5">
              <AskMenu
                questionCode={PRI_LOC3}
                icon={<Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>{`Add`}</Button>}
                hideLabel={true}
              />
              <Drafts code={PRI_LOC4} />
              <Avatar code={PRI_LOC5} />
            </HStack>
          </Flex>
        </nav>
      </header>
    </>
  )
}

const DesktopNav = ({ logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue('#F6F6F6', theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const headerPcmCode = find(includes('_HEADER'))(allPcmCode)

  const headerPcm = useSelector(selectCode(headerPcmCode, 'allAttributes'))
  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(headerPcm || [])

  const { PRI_TEMPLATE_CODE: code } = mappedPcm

  if (headerPcm) {
    if (code === 'TPL_NORTH')
      return <TemplateOne bg={bg} color={color} mappedPcm={mappedPcm} logoSrc={logoSrc} />
  }

  return <DefaultTemplate bg={bg} color={color} logoSrc={logoSrc} />
}

export default DesktopNav
