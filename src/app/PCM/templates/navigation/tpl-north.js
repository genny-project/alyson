import { Box, Button, Image, Flex, HStack, Spacer } from '@chakra-ui/react'
import { dashboardViewQuestion } from 'utils/constants'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import AskMenu from 'app/ASKS/menu'
import Avatar from 'app/layouts/navigation/Avatar.js'
import Drafts from 'app/layouts/navigation/drafts/Drafts.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSendMessage } from 'vertx'

import { apiConfig } from 'config/get-api-config'
import { LOGO_WIDTH } from 'utils/constants'

const TemplateNorth = ({ bg, color, mappedPcm, logoSrc }) => {
  const { PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

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

export default TemplateNorth
