import CheckBox from 'app/DTT/check_box'

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
}

const questionCode = ''
const data = ''
const onSendAnswer = ''
const isRequired = ''

const Template = args => {
  console.log('args', { args })
  return (
    <CheckBox.Write
      {...args}
      questionCode={questionCode}
      data={data}
      onSendAnswer={onSendAnswer}
      isRequired={isRequired}
      label="Checkbox"
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {
  autoFocus: true,
  label: 'Name',
  fullwidth: false,
}
