import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { HStack } from '@chakra-ui/react'

const Process = () => {
  const processCodes = useSelector(selectProcess)

  if (!processCodes) return null
  return (
    <HStack align="flex-start">
      {processCodes.map(sbeCode => (
        <Lane key={sbeCode} sbeCode={sbeCode} />
      ))}
    </HStack>
  )
}

export default Process
