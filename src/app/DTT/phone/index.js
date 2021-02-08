import { Input } from '@chakra-ui/react'
import { Read } from 'app/DTT/text'

const Write = ({ onSendAnswer }) => <Input type="tel" onBlur={e => onSendAnswer(e.target.value)} />

const Phone = {
  Write,
  Read,
}

export default Phone
