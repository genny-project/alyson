import { Input } from '@chakra-ui/react'
import { Read } from 'app/DTT/text'

const Write = props => <Input type="email" onChange={e => props.onSendAnswer(e.target.value)} />

const Email = {
  Write,
  Read,
}

export default Email
