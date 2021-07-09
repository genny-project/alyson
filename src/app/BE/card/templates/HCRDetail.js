import { HStack } from '@chakra-ui/react'
import { includes } from 'ramda'
import SigDetails from './SigDetails'

const HCRDetail = ({ code, parentCode }) => {
  return (
    <HStack mt="3" justify="flex-end">
      {includes('SBE_OFFERED_', parentCode) && (
        <SigDetails parentCode={parentCode} code={code} viewer="hcr" />
      )}
    </HStack>
  )
}

export default HCRDetail
