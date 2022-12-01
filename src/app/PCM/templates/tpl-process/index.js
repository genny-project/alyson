import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import { HStack, VStack } from '@chakra-ui/react'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'

const TemplateProcess = ({ mappedPcm }) => {
  const spillLocs = getSpillLocs(mappedPcm, 'PRI_LOC1')

  return (
    <VStack align="start" spacing={0} px="5">
      <PcmField code={mappedPcm.PRI_LOC1} />
      <HStack
        spacing={5}
        paddingBlock="5"
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
