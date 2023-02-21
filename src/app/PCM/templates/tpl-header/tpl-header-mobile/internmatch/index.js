import { Divider, Flex, HStack, Text } from '@chakra-ui/react'

import { useTheme } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import { Iconly } from 'react-iconly'
import { nameAttributeKey } from 'utils/constants'
import getFirstName from 'utils/helpers/get-first-name'
import getUserAttribute from 'utils/helpers/get-user-information'

const TemplateHeaderInternMatchMobile = ({ mappedPcm, depth }) => {
  const userName = getUserAttribute(nameAttributeKey)
  const userFirstName = getFirstName(userName)
  const { PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

  const theme = useTheme()

  return (
    <>
      <Flex align="center">
        <Text fontSize="1rem" fontWeight="400" color="white" marginInlineStart={'1.5rem'}>
          {`Welcome back, ${userFirstName}!`}
        </Text>

        <Divider marginInline={'1.5rem'} borderColor="#96D5D3" flex={1} />

        <HStack spacing={4}>
          <Iconly
            name="Search"
            set="two-tone"
            size="medium"
            primaryColor={theme.colors.internmatch.light}
          />
          <Iconly
            name="Bookmark"
            set="two-tone"
            size="medium"
            primaryColor={theme.colors.internmatch.light}
          />
          <PcmField code={PRI_LOC3} mappedPcm={mappedPcm} depth={depth} />
          <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} depth={depth} />
          <PcmField code={PRI_LOC4} mappedPcm={mappedPcm} depth={depth} />
        </HStack>
      </Flex>
    </>
  )
}

export default TemplateHeaderInternMatchMobile
