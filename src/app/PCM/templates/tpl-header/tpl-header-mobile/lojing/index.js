import { Box, Flex, HStack, Image, Spacer } from '@chakra-ui/react'

import PcmField from 'app/PCM/components/pcm-field'

const TemplateHeaderMobile = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

  return (
    <nav>
      <Flex align="center" paddingBlock="4" paddingInlineStart={14} paddingInlineEnd={4}>
        <Box mx={5} alignItems="center" m="auto">
          <Image src={'/lojing-logo.png'} alt={''} w={'7.5rem'} />
          {/* <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} depth={depth} /> */}
        </Box>
        <Spacer />
        <HStack spacing={6}>
          <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} depth={depth} />
          <PcmField code={PRI_LOC3} mappedPcm={mappedPcm} depth={depth} />
          <PcmField code={PRI_LOC4} mappedPcm={mappedPcm} depth={depth} />
        </HStack>
      </Flex>
    </nav>
  )
}

export default TemplateHeaderMobile
