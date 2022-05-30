import { Text } from '@chakra-ui/layout'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const GetAttributeName = ({ attribute, config }) => {
  const attributeName = useSelector(selectCode(attribute, 'attributeName')) || ''
  return <Text {...config}>{attributeName}</Text>
}

export default GetAttributeName
