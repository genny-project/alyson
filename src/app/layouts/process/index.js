import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import { VStack, HStack, Box, Center } from '@chakra-ui/react'

import Lane from 'app/SBE/lane'
import Search from 'app/SBE/search/Search'
import { selectCode } from 'redux/db/selectors'
import Ask from 'app/ASKS/ask'

import getUserType from 'utils/helpers/get-user'

const Process = ({ dashboard }) => {
  const userType = getUserType()
  const processCodes = useSelector(selectProcess, (prev, next) => prev.length === next.length)

  const bucketSearch = useSelector(selectCode('QUE_BUCKET_INTERNS_GRP')) || []

  if (!processCodes) return null
  return (
    <VStack align="start" spacing={0} px="5">
      {!dashboard && userType !== 'INTERN' && (
        <HStack align="start">
          {bucketSearch &&
            bucketSearch.map(childAsk => (
              <Box width={'20rem'}>
                <Ask noLabel questionCode={childAsk} parentCode={'QUE_BUCKET_INTERNS_GRP'} />
              </Box>
            ))}
          <Search process={processCodes[0]} sbeCode={JSON.stringify(processCodes)} />
        </HStack>
      )}

      <HStack spacing={5} mt="5" w="95vw" align="flex-start" justify="space-between">
        {processCodes.map(sbeCode => (
          <Lane key={sbeCode} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </HStack>
    </VStack>
  )
}

export default Process
