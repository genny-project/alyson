import { Box, Center, CircularProgress, Stack } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import TemplateDefault from 'app/PCM/templates/tpl-default'
import { useSelector } from 'react-redux'
import { selectIsLoading } from 'redux/app/selectors'
import debugOut from 'utils/debug-out'

/**
 * A straight passthrough template, can use this to prevent re-rendering large templates with lots of children
 */
const TemplateContent = ({ mappedPcm, depth, parentCode, ...rest }) => {
  const { PRI_LOC1 } = mappedPcm || {}
  const isLoading = useSelector(selectIsLoading)
  if (!PRI_LOC1) {
    debugOut.warn(`PRI_LOC1 is missing from the list of BaseEntity Attributes for ${parentCode}`)
    return <TemplateDefault />
  }

  return (
    <Stack>
      <Box hidden={!isLoading}>
        <Center>
          <CircularProgress isIndeterminate></CircularProgress>
        </Center>
      </Box>
      <Box hidden={isLoading}>
        <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} properties={rest} depth={depth} />
      </Box>
    </Stack>
  )
}

export default TemplateContent
