import { Read } from 'app/DTT/text'
import GetAddress from './get_address'
const Write = ({ onSendAnswer, data }) => {
  return <GetAddress onSendAnswer={onSendAnswer} data={data} />
}
const Address = {
  Write,
  Read,
}
export default Address
