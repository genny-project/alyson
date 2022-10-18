import Text from 'app/DTT/text'

export default {
  title: 'Components/Text',
  component: Text,
}

const questionCode = ''
const data = ''
const onSendAnswer = ''
const regexPattern = ''
const errorMessage = 'Please enter valid data.'
const parentCode = ''
const placeholderName = 'Enter Value'

const Template = args => {
  return (
    <Text.Write
      questionCode={questionCode}
      data={data}
      onSendAnswer={onSendAnswer}
      regexPattern={regexPattern}
      errorMessage={errorMessage}
      parentCode={parentCode}
      placeholderName={placeholderName}
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  mandatory: false,
  isInvalid: false,
}
