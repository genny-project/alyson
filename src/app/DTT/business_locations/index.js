import RepeatableAsk from 'app/ASKS/repeatable-ask'
import BusinessAsk from './business_ask'

const Write = ({
  questionCode,
  onSendAnswer,
  data,
  regexPattern,
  errorMessage,
  parentCode,
  placeholderName,
  attributeCode,
  targetCode,
  mandatory,
  clientId,
}) => {
  return (
    <RepeatableAsk
      id={questionCode}
      questionCode={questionCode}
      onSendAnswer={onSendAnswer}
      data={data}
      placeholderName={placeholderName}
      mandatory={mandatory}
      clientId={clientId}
      emptyValue={'{}'}
      errorMessage={errorMessage}
      component={BusinessAsk}
    />
  )
}

const Read = () => {
  return <div>read</div>
}

const BusinessLocations = {
  Write,
  Read,
}

export default BusinessLocations
