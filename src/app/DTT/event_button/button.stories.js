import EventButton from 'app/DTT/event_button'

export default {
  title: 'Components/EventButton',
  component: EventButton,
}

const askData = ''
const onFinish = ''
const parentCode = ''
const clientId = ''

const Template = args => {
  console.log('args', { args })
  return (
    <EventButton
      askData={askData}
      onFinish={onFinish}
      parentCode={parentCode}
      clientId={clientId}
    />
  )
}

export const Primary = Template.bind({})
Primary.args = {
  autoFocus: true,
  label: 'Name',
  fullwidth: false,
}
