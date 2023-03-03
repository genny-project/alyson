import { Text, VStack } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TableTitle = ({ sbeCode }) => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const description = useSelector(selectCode(sbeCode, 'SCH_DESC'))

  return (
    <VStack alignItems={'flex-start'} paddingX="5">
      <Text fontSize="1.2rem" fontWeight="400" color="#063231">
        {title?.value}
      </Text>
      <Text fontSize="1.0rem" fontWeight="400" color="#063231">
        {description?.value}
      </Text>
    </VStack>
  )
}

export default TableTitle
