import EventButton from 'app/DTT/event_button'

export default {
  title: 'Components/EventButton',
  component: EventButton,
}

const askData = { name: 'Save' }
const onFinish = ''
const parentCode = ''
const clientId = ''

const Template = args => {
  return (
    <EventButton
      askData={askData}
      onFinish={onFinish}
      parentCode={parentCode}
      clientId={clientId}
      {...args}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {
  label: 'Save',
}
