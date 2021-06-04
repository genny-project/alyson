import { Flex, Spacer, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Title = ({ sbeCode }) => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))

  return (
    <Flex w="full">
      <Spacer />
      <Text textStyle="head.2">{title?.value}</Text>
      <Spacer />
      <Text textStyle="head.3">{total?.value}</Text>
      <Spacer />
    </Flex>
  )
}

export default Title
