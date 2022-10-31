import Text from 'app/DTT/text'

export default {
  title: 'Components/Text',
  component: Text,
}

const questionCode = ''
const data = ''
const onSendAnswer = ''
const regexPattern = ''
const errorMessage = 'Please enter valid data.'
const parentCode = ''
const placeholderName = 'Enter Value'
const readData = { value: 'Some Text Here..' }
const config = {}

const Template = args => {
  return (
    <Text.Write
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

export const Write = Template.bind({})
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

const HeaderText = args => {
  return <Text.Read data={readData} config={config} {...args} />
}
export const Read = HeaderText.bind({})
Read.argTypes = {
  TextContent: {
    control: 'text',
  },
  TextSize: {
    options: ['Header1', 'Header2', 'Header3', 'Header4', 'Header5', 'Caption', 'Body'],
    mapping: {
      Header1: '36px',
      Header2: '24px',
      Header3: '18px',
      Header4: '16px',
      Header5: '14px',
      Body: '12px',
      Caption: '16px',
    },
    control: {
      type: 'inline-radio',
      labels: {
        Header1: 'Header 1',
        Header2: 'Header 2',
        Header3: 'Header 3',
        Header4: 'Header 4',
        Header5: 'Header 5',
        Body: 'Body',
        Caption: 'Caption',
      },
    },
  },
  TextColor: {
    control: 'color',
  },
  TextWeight: {
    options: ['Bold', 'Medium', 'Normal'],
    mapping: {
      Bold: '900',
      Medium: '600',
      Normal: '400',
    },
    control: {
      type: 'inline-radio',
      labels: {
        Normal: 'Normal',
        Medium: 'Medium',
        Bold: 'Bold',
      },
    },
  },
}
Read.args = {
  TextSize: 'Caption',
  TextWeight: 'Normal',
}
