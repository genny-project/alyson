import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { HStack, Stack, VStack } from '@chakra-ui/react'
import Search from 'app/SBE/search/Search'

const Process = ({ dashboard }) => {
  const processCodes = useSelector(selectProcess)

  if (!processCodes) return null
  return (
    <div>
      {!dashboard && <Search sbeCode={JSON.stringify(processCodes)} />}
      <HStack align="flex-start" p="5" spacing="6">
        {processCodes.map(sbeCode => (
          <Lane key={sbeCode} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </HStack>
    </div>
  )
}

export default Process
