import { Read } from 'app/DTT/text'
import AddressPicker from './address_picker'

const Write = ({ onSendAnswer, data }) => {
  return <AddressPicker onSendAnswer={onSendAnswer} data={data} />
}

const Address = {
  Write,
  Read,
}

export default Address
