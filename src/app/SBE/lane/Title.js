import { Heading, Flex, Spacer, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Title = ({ sbeCode }) => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))

  return (
    <Flex w="15rem">
      <Heading color="teal">{title?.value}</Heading>
      <Spacer />
      <Stat color="teal.700">
        <StatLabel>Total</StatLabel>
        <StatNumber>{total?.value}</StatNumber>
      </Stat>
    </Flex>
  )
}

export default Title
