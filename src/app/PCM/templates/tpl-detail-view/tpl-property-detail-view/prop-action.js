import { Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const PropAction = ({ parentCode, code, targetCode }) => {
  const data = useSelector(selectCode(parentCode, code))

  if (!data) return <box />

  const handleClick = code => {
    onSendMessage({ parentCode, code, targetCode })
  }

  return (
    <Button
      width={'100%'}
      onClick={() => handleClick(code)}
      backgroundColor="product.secondary"
      textColor="white"
      fontWeight={'normal'}
      borderRadius="3xl"
    >
      {data.attributeName || ''}
    </Button>
  )
}

export default PropAction
