import RepeatableAsk from 'app/ASKS/repeatable-ask'
import SingleSelect from 'app/DTT/select/single-select'

const Write = ({ component, ...props }) => {
  if (component === 'repeatable_dropdown') {
    return <RepeatableAsk component={Select.Write} {...props} />
  } else {
    return <SingleSelect.Write {...props} />
  }
}

const Read = ({ data, dataType }) => {
  return <SingleSelect.Read data={data} dataType={dataType} />
}

const Select = {
  Write,
  Read,
}

export default Select
