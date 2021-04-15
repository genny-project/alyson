import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text } from '@chakra-ui/react'

const Label = ({ code, attribute, colorScheme }) => {
  const data = useSelector(selectCode(code, attribute))

  return <Text textStyle="body1">{data?.attributeName}</Text>
}

export default Label
