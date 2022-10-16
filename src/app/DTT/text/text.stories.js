import Text from 'app/DTT/text'

export default {
  title: 'Components/Text',
  component: Text,
}

const questionCode = ''
const data = ''
const onSendAnswer = ''
const regexPattern = ''
const errorMessage = ''
const parentCode = ''
const placeholderName = ''
const mandatory = ''

const Template = args => {
  console.log('args', { args })
  return (
    <Text.Write
      questionCode={questionCode}
      data={data}
      onSendAnswer={onSendAnswer}
      regexPattern={regexPattern}
      errorMessage={errorMessage}
      parentCode={parentCode}
      placeholderName={placeholderName}
      mandatory={mandatory}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {
  autoFocus: true,
  label: 'Name',
  fullwidth: false,
}
