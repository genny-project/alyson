import { Box, VStack } from '@chakra-ui/react'

import DetailSection from 'app/layouts/components/detail_section'
import LinkedSupervisor from './LinkedSupervisor'
import Software from 'app/layouts/components/software'
import Attribute from 'app/BE/attribute'

const LeftHandDetails = ({ videoData, beCode, internshipDetail, linkedSupervisor, software }) => {
  return (
    <VStack align="start">
      {videoData && (
        <Box position="absolute" mt="-16rem">
          <Attribute code={beCode} attribute={'PRI_VIDEO_URL'} />
        </Box>
      )}
      <LinkedSupervisor sbeCode={linkedSupervisor} />
      <DetailSection
        config={{ textStyle: 'body2' }}
        noTitle
        code={beCode}
        details={internshipDetail}
      />
      <Software value={software?.value || ''} title={`Software to be Used`} />
    </VStack>
  )
}

export default LeftHandDetails
