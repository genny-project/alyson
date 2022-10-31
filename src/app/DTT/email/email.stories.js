import Email from 'app/DTT/email'

export default {
  component: Email,
  title: 'Components/Email',
}

const questionCode = ''
const data = ''
const onSendAnswer = ''
const regexPattern = '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/'
const errorMessage = 'Please enter valid data.'
const parentCode = ''
const placeholderName = 'Enter email address'
const readData = {
  value: 'digesh.bajracharya@gada.io',
}

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
Write.argTypes = {
  BackgroundColor: {
    control: 'color',
  },
  BorderColor: {
    control: 'color',
  },
  BorderHoverColor: {
    control: 'color',
  },
  PlaceholderColor: {
    control: 'color',
  },
  LabelTextColor: {
    control: 'color',
  },
}

const TemplateRead = args => {
  return <Email.Read data={readData} {...args} />
}
export const Read = TemplateRead.bind({})
Read.argTypes = {
  TextContent: {
    control: 'text',
  },
  TextColor: {
    control: 'color',
  },
}
