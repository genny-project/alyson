import { Input } from '@chakra-ui/react'
import { Read } from 'app/DTT/text'

const Write = ({ data, onSendAnswer }) => (
  <Input defaultValue={data?.value} type="email" onChange={e => onSendAnswer(e.target.value)} />
)

const Email = {
  Write,
  Read,
}

export default Email
