import { Box, Flex, HStack, Text, Divider } from '@chakra-ui/react'

import PcmField from 'app/PCM/components/pcm-field'
import getUserAttribute from 'utils/helpers/get-user-information'
import { nameAttributeKey } from 'utils/constants'
import getFirstName from 'utils/helpers/get-first-name'

const TemplateHeaderDesktopInternmatch = ({ mappedPcm, depth }) => {
  const userName = getUserAttribute(nameAttributeKey)
  const userFirstName = getFirstName(userName)
  const { PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

  return (
    <nav>
      <Flex align="center" paddingBlock="4" paddingInline={12}>
        <Box w="100%" maxW="14rem">
          <Text
            fontSize="1.25rem"
            fontWeight="400"
            color="#063231"
          >{`Welcome back, ${userFirstName}!`}</Text>
        </Box>
        <Divider marginRight="2rem" borderColor="#96D5D3" />
        <HStack spacing={9} marginRight="5">
          <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} depth={depth} />
          <PcmField code={PRI_LOC3} mappedPcm={mappedPcm} depth={depth} />
          <PcmField code={PRI_LOC4} mappedPcm={mappedPcm} depth={depth} />
        </HStack>
      </Flex>
    </nav>
  )
}

export default TemplateHeaderDesktopInternmatch
