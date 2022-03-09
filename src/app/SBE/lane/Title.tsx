import { Flex, Spacer, Text } from '@chakra-ui/react'

import { ReactElement } from 'react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const Title = ({ sbeCode }: { sbeCode: string }): ReactElement => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))?.value
  const total = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))?.value

  return (
    <Flex w="full">
      <Spacer />
      <Text textStyle="head.2" test-id={`Process-${title}`}>
        {title}
      </Text>
      <Spacer />
      <Text textStyle="head.2" test-id={`Process-${title}-Count`}>
        {total}
      </Text>
      <Spacer />
    </Flex>
  )
}

export default Title
