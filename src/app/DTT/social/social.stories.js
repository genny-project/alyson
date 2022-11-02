import Social from 'app/DTT/social'

export default {
  title: 'Components/Social',
  component: Social,
}

const TemplateWrite = args => {
  return (
    <Social.Write
      questionCode={''}
      onSendAnswer={() => {}}
      data={''}
      regexPattern={''}
      errorMessage={''}
      parentCode={''}
      {...args}
    />
  )
}

export const Write = TemplateWrite.bind({})
Write.args = {
  mandatory: true,
  placeholderName: 'Enter a value',
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
  return <Social.Read data={{ value: 'https://www.linkedin.com/' }} config={{}} {...args} />
}
export const Read = TemplateRead.bind({})
Read.args = {
  IsDisabled: false,
}
