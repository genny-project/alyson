import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { Box, Stack } from '@chakra-ui/react'
import Search from 'app/SBE/search/Search'

const Process = ({ dashboard }) => {
  const processCodes = useSelector(selectProcess)

  if (!processCodes) return null
  return (
    <div>
      {!dashboard && (
        <Box ml="1rem">
          <Search sbeCode={JSON.stringify(processCodes)} />
        </Box>
      )}
      <Stack direction={['column', 'row']} align="flex-start" p="5" spacing="6">
        {processCodes.map(sbeCode => (
          <Lane key={sbeCode} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </Stack>
    </div>
  )
}

export default Process
