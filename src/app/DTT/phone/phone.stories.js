import Phone from 'app/DTT/phone'

export default {
  title: 'Components/Phone',
  component: Phone,
}

const PhoneWriteTemplate = args => {
  const { Placeholder, Mandatory, ErrorMessage, Invalid } = args
  return (
    <Phone.Write
      questionCode={''}
      onSendAnswer={() => {}}
      data={''}
      errorMessage={ErrorMessage}
      parentCode={''}
      placeholderName={Placeholder}
      mandatory={Mandatory}
      isInvalid={Invalid}
    />
  )
}

export const Write = PhoneWriteTemplate.bind({})
Write.args = {
  Placeholder: 'Enter phone number',
  Mandatory: true,
  Invalid: false,
  ErrorMessage: 'Phone number is invalid.',
}

const PhoneReadTemplate = args => {
  const { Data } = args
  return <Phone.Read data={Data} config={{}} />
}
export const Read = PhoneReadTemplate.bind({})
Read.args = {
  Data: {
    value: '+977987654321',
  },
}
Read.argTypes = {
  Data: {
    control: 'object',
  },
}
