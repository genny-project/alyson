import React from 'react'
import ProgressBar from './index'

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {},
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

const Template = args => <ProgressBar {...args} />

export const Pristine = Template.bind({})
Pristine.args = {
  value: '{"completedPercentage": 60, "steps": 12}',
}

export const NotStarted = Template.bind({})
NotStarted.args = {
  value: '{"completedPercentage": 0, "steps": 12}',
}

export const Completed = Template.bind({})
Completed.args = {
  value: '{"completedPercentage": 100, "steps": 12}',
}
