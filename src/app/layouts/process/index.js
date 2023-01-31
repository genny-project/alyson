import { Box, HStack, VStack } from '@chakra-ui/react'

import Ask from 'app/ASKS/ask'
import Lane from 'app/SBE/lane'
import Search from 'app/SBE/search/Search'
import getUserType from 'utils/helpers/get-user'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { SIDEBAR_WIDTH } from 'utils/constants'

const Process = ({ dashboard, processCodes }) => {
  const userType = getUserType()
  const bucketSearch = useSelector(selectCode('QUE_BUCKET_INTERNS_GRP')) || []

  if (!processCodes) return null
  return (
    <VStack align="start" spacing={0} overflow={'auto'}>
      {!dashboard && userType !== 'INTERN' && (
        <HStack w={'full'} mb={`4`} align="end" px={5}>
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
        w={`100vw - ${SIDEBAR_WIDTH}px`}
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
