import { Read } from 'app/DTT/text'
import AddressPicker from './address_picker'

const Write = ({ questionCode, onSendAnswer, data }) => {
  return <AddressPicker questionCode={questionCode} onSendAnswer={onSendAnswer} data={data} />
}

const Address = {
  Write,
  Read,
}

export default Address
