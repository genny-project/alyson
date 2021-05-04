import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text } from '@chakra-ui/react'

const Label = ({ code, attribute, horizontalLayout }) => {
  const data = useSelector(selectCode(code, attribute))

  return (
    <Text
      textStyle={horizontalLayout ? 'body.3' : 'body.1'}
      w={horizontalLayout ? '7rem' : 'auto'}
      mr={2}
    >
      {data?.attributeName}
    </Text>
  )
}

export default Label
