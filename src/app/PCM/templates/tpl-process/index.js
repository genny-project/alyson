import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import { HStack, VStack, Box } from '@chakra-ui/react'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'

const TemplateProcess = ({ mappedPcm }) => {
  const spillLocs = getSpillLocs(mappedPcm, 'PRI_LOC1')

  return (
    <VStack justifyContent="flex-start" spacing={0} px="5">
      <Box alignSelf={'flex-start'}>
        <PcmField code={mappedPcm.PRI_LOC1} />
      </Box>

      <HStack
        spacing={5}
        paddingBlock="5"
        align="flex-start"
        justify="space-between"
        height={'auto'}
        overflow={'auto'}
      >
        {mapSpillLocs(loc => <PcmField key={loc} code={loc} />)(spillLocs)}
      </HStack>
    </VStack>
  )
}

export default TemplateProcess
