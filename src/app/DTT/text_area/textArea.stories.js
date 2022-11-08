import TextArea from 'app/DTT/text_area'

export default {
  title: 'Components/Text Area',
  component: TextArea,
}

const TextAreaWriteTemplate = args => {
  const { Placeholder, Mandatory, Sanatise, ErrorMessage } = args
  return (
    <TextArea.Write
      questionCode={''}
      data={''}
      onSendAnswer={() => {}}
      regexPattern={''}
      errorMessage={ErrorMessage}
      parentCode={''}
      placeholderName={Placeholder}
      mandatory={Mandatory}
      onChange={''}
      sanatise={Sanatise}
    />
  )
}

export const Write = TextAreaWriteTemplate.bind({})
Write.args = {
  Placeholder: 'Enter Text',
  Mandatory: true,
  Sanatise: true,
  ErrorMessage: 'This field is not valid.',
}

const TextAreaReadTemplate = args => {
  const { Text } = args
  return <TextArea.Read data={{ value: Text }} config={{}} />
}

export const Read = TextAreaReadTemplate.bind({})
Read.args = {
  Text: 'Enter some text',
}
