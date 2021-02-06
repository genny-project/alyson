import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { HStack } from '@chakra-ui/react'
import Search from './Search'

const Process = () => {
  const processCodes = useSelector(selectProcess)

  if (!processCodes) return null
  return (
    <div>
      <Search />
      <HStack align="flex-start" p="6" spacing="6">
        {processCodes.map(sbeCode => (
          <Lane key={sbeCode} sbeCode={sbeCode} />
        ))}
      </HStack>
    </div>
  )
}

export default Process
