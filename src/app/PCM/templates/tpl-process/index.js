import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import { HStack, VStack } from '@chakra-ui/react'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'

const TemplateProcess = ({ mappedPcm }) => {
  const spillLocs = getSpillLocs(mappedPcm)

  return (
    <VStack align="start" spacing={0} px="5">
      <HStack
        spacing={5}
        // paddingBlock="5"
        align="flex-start"
        justify="space-between"
        overflow={'auto'}
      >
        {mapSpillLocs(loc => <PcmField key={loc} code={loc} />)(spillLocs)}
      </HStack>
    </VStack>
  )
}

export default TemplateProcess
