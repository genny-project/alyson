import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react'
import { LOGO_WIDTH, addItemsQuestionCode, dashboardViewQuestion } from 'utils/constants'

import AskMenu from 'app/ASKS/menu'
import Avatar from '../Avatar'
import Drafts from '../drafts/Drafts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import isNotEmpty from 'utils/helpers/is-not-empty.js'
import { onSendMessage } from 'vertx'
import templateHandlerMachine from 'app/PCM/templates'
import useGetMappedPcm from 'app/PCM/helpers/get-mapped-pcm'

const DefaultTemplate = ({ bg, color, logoSrc }) => {
  return (
    <>
      <header
        style={{
          color,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          maxWidth: '100vw',
          h: 25,
          backgroundColor: bg,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
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

const DesktopNav = ({ logoSrc, value }) => {
  const theme = useTheme()
  const bg = useColorModeValue(theme.colors.background.light, theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)
  const textColor = equals('mentormatch', value) ? '#F36C24' : '#234371'

  const mappedPcm = useGetMappedPcm('_HEADER')

  const { PRI_TEMPLATE_CODE: code } = mappedPcm

  const properties = { bg, color, mappedPcm, logoSrc, textColor }

  if (isNotEmpty(mappedPcm) && templateHandlerMachine(code)(properties)) {
    return templateHandlerMachine(code)(properties)
  }
  // console.error('Falling back on default template for ' + code + '!')
  return <DefaultTemplate {...properties} />
}

export default DesktopNav
