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

import AskMenu from 'app/ASKS/menu'
import Avatar from '../Avatar'
import Drafts from '../drafts/Drafts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSendMessage } from 'vertx'
import { apiConfig } from 'config/get-api-config'
import { LOGO_WIDTH } from 'utils/constants'
import templateHandlerMachine from 'app/PCM/templates'

import useGetMappedPcm from 'app/PCM/helpers/get-mapped-pcm'
import isNotEmpty from 'utils/helpers/is-not-empty.js'

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

const DesktopNav = ({ logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue('#F6F6F6', theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const mappedPcm = useGetMappedPcm('_HEADER')

  const { PRI_TEMPLATE_CODE: code } = mappedPcm
  const properties = { bg, color, mappedPcm, logoSrc }

  if (isNotEmpty(mappedPcm)) {
    return templateHandlerMachine(code)(properties)
  }

  return <DefaultTemplate {...properties} />
}

export default DesktopNav
