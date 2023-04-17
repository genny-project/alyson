import { Box } from '@chakra-ui/react'
import RepeatableAsk from 'app/ASKS/repeatable-ask'
import BusinessAsk from 'app/DTT/business_locations/business_ask.js'

const Write = ({
  questionCode,
  onSendAnswer,
  data,
  regexPattern,
  errorMessage,
  parentCode,
  attributeCode,
  targetCode,
  mandatory,
  clientId,
}) => {
  const placeholderName = 'What is your head office business address?'
  const secondaryPlaceholderName = 'Would you like to add another location?'

  return (
    <RepeatableAsk
      id={questionCode}
      questionCode={questionCode}
      onSendAnswer={onSendAnswer}
      data={data}
      placeholderName={placeholderName}
      secondPlaceholderName={secondaryPlaceholderName}
      mandatory={mandatory}
      clientId={clientId}
      emptyValue={'{}'}
      errorMessage={errorMessage}
      component={BusinessAsk}
      centerDeleteButton
      showEmptyValueOnLoad
    />
  )
}

const Read = () => {
  return <Box>Implement Me!</Box>
}

const BusinessLocations = {
  Write,
  Read,
}

export default BusinessLocations
