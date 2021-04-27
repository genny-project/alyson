import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text } from '@chakra-ui/react'

const Label = ({ code, attribute, horizontalLayout }) => {
  const data = useSelector(selectCode(code, attribute))

  return (
    <Text
      textStyle={horizontalLayout ? 'body3' : 'body1'}
      w={horizontalLayout ? '7rem' : 'auto'}
      mr={2}
    >
      {data?.attributeName}
    </Text>
  )
}

export default Label
