import { VStack } from '@chakra-ui/react'

import DetailSection from 'app/layouts/components/detail_section'
import LinkedSupervisor from './LinkedSupervisor'
import Software from 'app/layouts/components/software'

const LeftHandDetails = ({ beCode, internshipDetail, linkedSupervisor, software }) => {
  return (
    <VStack align="start">
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
