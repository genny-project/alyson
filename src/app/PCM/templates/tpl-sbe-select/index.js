import { Box, HStack } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import { useState } from 'react'
import deArrayifyValue from 'utils/helpers/de-arrayify-value'

const TemplateSBESelect = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

  const [savedSearch, setSavedSearch] = useState()

  const answerCallback = (askData, value) => {
    setSavedSearch(deArrayifyValue(value?.value || ''))
  }

  const selectFieldConfig = {
    answerCallback: answerCallback,
  }

  return (
    <Box>
      <HStack alignItems={'flex-end'}>
        <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} config={selectFieldConfig} />
        <Box paddingBottom={2}>
          <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} evtValue={savedSearch} />
        </Box>
        <Box paddingBottom={2}>
          <PcmField code={PRI_LOC3} mappedPcm={mappedPcm} evtValue={savedSearch} />
        </Box>
        <Box paddingBottom={2}>
          <PcmField code={PRI_LOC4} mappedPcm={mappedPcm} evtValue={savedSearch} />
        </Box>
      </HStack>
    </Box>
  )
}

export default TemplateSBESelect
