import {
  useColorModeValue,
  useTheme,
  Flex,
  Box,
  Spacer,
  HStack,
  Button,
  Image,
} from '@chakra-ui/react'
import { LOGO_WIDTH } from 'utils/constants'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import convertToUppercase from 'utils/formatters/uppercase-convert'
import { apiConfig } from 'config/get-api-config'
import AskMenu from 'app/ASKS/menu'
import Avatar from 'app/layouts/navigation/Avatar'
import Drafts from 'app/layouts/navigation/drafts/Drafts'
import getPcmField from 'app/PCM/helpers/get-pcm-field'

const TemplateHeaderDesktop = ({ mappedPcm, logoSrc }) => {
  const theme = useTheme()
  const bg = useColorModeValue('#F6F6F6', theme.colors.primary[900])
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  const { realm } = apiConfig
  const appName = convertToUppercase(realm)

  const entityCode = 'PRJ_' + appName

  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

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
              {PRI_LOC1 &&
                getPcmField(PRI_LOC1, mappedPcm, {
                  parentCode: entityCode,
                  config: { htmlWidth: LOGO_WIDTH },
                })()}
              {!PRI_LOC1 && <Image src={logoSrc} htmlWidth={LOGO_WIDTH} />}
            </Box>
            <Spacer />
            <HStack spacing={8} marginRight="5">
              <AskMenu
                questionCode={PRI_LOC2}
                icon={<Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>{`Add`}</Button>}
                hideLabel={true}
              />
              <Drafts code={PRI_LOC3} />
              <Avatar code={PRI_LOC4} />
            </HStack>
          </Flex>
        </nav>
      </header>
    </>
  )
}

export default TemplateHeaderDesktop
