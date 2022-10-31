import Email from 'app/DTT/email'

export default {
  component: Email,
  title: 'Components/Email',
}

const questionCode = ''
const data = ''
const onSendAnswer = ''
const regexPattern = ''
const errorMessage = 'Please enter valid data.'
const parentCode = ''
const placeholderName = 'Enter email address'

const TemplateWrite = args => {
  return (
    <Email.Write
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

export const Write = TemplateWrite.bind({})
Write.args = {
  mandatory: false,
  isInvalid: false,
}
