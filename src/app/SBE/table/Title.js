import { Heading } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TableTitle = ({ sbeCode }) => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))

  return <Heading ml="5">{title?.value}</Heading>
}

export default TableTitle
