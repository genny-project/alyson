import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Badge } from '@chakra-ui/react'

const Label = ({ code, attribute }) => {
  const data = useSelector(selectCode(code, attribute))

  return <Badge>{data?.attributeName}</Badge>
}

export default Label
