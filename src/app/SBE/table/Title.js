import { Text } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TableTitle = ({ sbeCode }) => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))

  return <Text textStyle="head1">{title?.value}</Text>
}

export default TableTitle
