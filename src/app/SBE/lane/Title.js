import { HStack, Spacer, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Title = ({ sbeCode }) => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))

  return (
    <HStack w="15rem">
      <Text textStyle="head.2">{title?.value}</Text>
      <Spacer />
      <Text textStyle="head.3">{total?.value}</Text>
    </HStack>
  )
}

export default Title
