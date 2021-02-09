import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'
import { Read } from '../text'

const Write = ({ data, onSendAnswer }) => {
  return <ReactDatePicker selected={data?.value} onChange={onSendAnswer} isClearable />
}

const DatePicker = {
  Write,
  Read,
}

export default DatePicker
