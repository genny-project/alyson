import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { Stack, VStack } from '@chakra-ui/react'
import Search from 'app/SBE/search/Search'

const Process = ({ dashboard }) => {
  const processCodes = useSelector(selectProcess)

  if (!processCodes) return null
  return (
    <VStack align="start" spacing={0} px="5">
      {!dashboard && <Search sbeCode={JSON.stringify(processCodes)} />}
      <Stack direction={dashboard ? 'column-reverse' : 'row'} spacing={5}>
        {processCodes.map(sbeCode => (
          <Lane key={sbeCode} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </Stack>
    </VStack>
  )
}

export default Process
