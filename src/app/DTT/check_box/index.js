import { compose, includes, toLower } from 'ramda'
import MultiCheckbox from 'app/DTT/check_box/multi-check-box'
import SingleCheckBox from 'app/DTT/check_box/single-check-box'

const Write = ({
  questionCode,
  data,
  typeName,
  onSendAnswer,
  parentCode,
  placeholderName,
  mandatory,
  config,
}) => {
  const singleCheckbox = compose(includes('boolean'), toLower)(typeName)

  if (singleCheckbox) {
    return (
      <SingleCheckBox.Write
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        label={placeholderName}
        isRequired={mandatory}
      />
    )
  } else {
    return (
      <MultiCheckbox.Write
        questionCode={questionCode}
        data={data}
        onSendAnswer={onSendAnswer}
        parentCode={parentCode}
        placeholderName={placeholderName}
        config={config}
      />
    )
  }
}

const Read = ({ typeName, data, dataType }) => {
  const singleCheckbox = includes('Boolean')(typeName)

  if (singleCheckbox) {
    return <SingleCheckBox.Read data={data} />
  } else {
    return <MultiCheckbox.Read data={data} dataType={dataType} />
  }
}

const Checkbox = {
  Write,
  Read,
}

export default Checkbox
