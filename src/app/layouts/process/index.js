import { Box, HStack, VStack } from '@chakra-ui/react'

import Ask from 'app/ASKS/ask'
import Lane from 'app/SBE/lane'
import Search from 'app/SBE/search/Search'
import getUserType from 'utils/helpers/get-user'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const Process = ({ dashboard, processCodes }) => {
  const userType = getUserType()

  // const processCodes = [
  //   'SBE_AVAILABLE_INTERNS',
  //   'SBE_PLACED_APPLICATIONS',
  //   'SBE_APPLIED_APPLICATIONS',
  //   'SBE_INPROGRESS_APPLICATIONS',
  //   'SBE_OFFERED_APPLICATIONS',
  //   'SBE_SHORTLISTED_APPLICATIONS',
  //   'SBE_INTERVIEWED_APPLICATIONS',
  // ]

  const bucketSearch = useSelector(selectCode('QUE_BUCKET_INTERNS_GRP')) || []

  if (!processCodes) return null
  return (
    <VStack align="start" spacing={0} px="5">
      {!dashboard && userType !== 'INTERN' && (
        <HStack w={'full'} mb={`4`} align="end">
          {bucketSearch &&
            bucketSearch.map((childAsk, index) => (
              <Box key={`${index}-${childAsk}`} width={'20rem'}>
                <Ask
                  noLabel
                  questionCode={childAsk}
                  parentCode={'QUE_BUCKET_INTERNS_GRP'}
                  forcedComponent="dropdown"
                />
              </Box>
            ))}
          <Search process={processCodes[0]} sbeCode={JSON.stringify(processCodes)} />
        </HStack>
      )}

      <HStack
        spacing={5}
        paddingBlock="5"
        w="95vw"
        align="flex-start"
        justify="space-between"
        overflow={'auto'}
      >
        {processCodes.map((sbeCode, index) => (
          <Lane key={`${index}-${sbeCode}`} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </HStack>
    </VStack>
  )
}

export default Process
