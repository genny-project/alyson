import URL from 'app/DTT/url'

export default {
  title: 'Components/URL',
  component: URL,
}

const URLWriteTemplate = args => {
  const { Placeholder, Mandatory, Invalid, ErrorMessage } = args
  return (
    <URL.Write
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

export const Write = URLWriteTemplate.bind({})
Write.args = {
  Placeholder: 'Enter a URL',
  Mandatory: false,
  Invalid: false,
  ErrorMessage: 'URL is invalid',
}

const URLReadTemplate = args => {
  const { Data, Size } = args
  return <URL.Read data={Data} size={Size} />
}
export const Read = URLReadTemplate.bind({})
Read.args = {
  Data: {
    value: 'https://wwww.google.com',
  },
  Size: 16,
}
Read.argTypes = {
  Size: {
    control: 'number',
    min: 8,
  },
}
