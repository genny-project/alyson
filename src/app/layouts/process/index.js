import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { Stack, VStack, HStack, Box } from '@chakra-ui/react'
import Search from 'app/SBE/search/Search'
import { selectCode } from 'redux/db/selectors'
import Ask from 'app/ASKS/ask'

const Process = ({ dashboard }) => {
  const processCodes = useSelector(selectProcess)

  const bucketSearch = useSelector(selectCode('QUE_BUCKET_INTERNS_GRP')) || []

  if (!processCodes) return null
  return (
    <VStack align="start" spacing={0} px="5">
      {!dashboard && (
        <HStack mb="5">
          {bucketSearch &&
            bucketSearch.map(childAsk => (
              <Box>
                <Ask questionCode={childAsk} parentCode={'QUE_BUCKET_INTERNS_GRP'} />
              </Box>
            ))}
          <Search process={processCodes[0]} sbeCode={JSON.stringify(processCodes)} />
        </HStack>
      )}

      <Stack direction={dashboard ? 'column-reverse' : 'row'} spacing={5}>
        {processCodes.map(sbeCode => (
          <Lane key={sbeCode} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </Stack>
    </VStack>
  )
}

export default Process
