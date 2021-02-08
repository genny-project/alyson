import { Input } from '@chakra-ui/react'
import { Read } from 'app/DTT/text'

const Write = ({ onSendAnswer }) => <Input onBlur={e => onSendAnswer(e.target.value)} />

const Address = {
  Write,
  Read,
}

export default Address
