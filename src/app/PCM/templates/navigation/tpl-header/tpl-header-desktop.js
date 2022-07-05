import { Flex, Box, Spacer, HStack, Button } from '@chakra-ui/react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AskMenu from 'app/ASKS/menu'
import Avatar from 'app/layouts/navigation/Avatar'
import Drafts from 'app/layouts/navigation/drafts/Drafts'
import PcmField from 'app/PCM/components/pcm-field'

const TemplateHeaderDesktop = ({ mappedPcm }) => {
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

  return (
    <>
      <nav>
        <Flex align="center" p="3">
          <Box mx={5} alignItems="center" m="auto">
            <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} />
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
    </>
  )
}

export default TemplateHeaderDesktop
