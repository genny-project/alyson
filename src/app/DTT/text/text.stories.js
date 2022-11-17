import Text from 'app/DTT/text'

export default {
  title: 'Components/Text',
  component: Text,
}

const readData = { value: 'Some Text Here..' }
const config = {}

const TextWriteTemplate = args => {
  const {
    mandatory,
    isInvalid,
    BackgroundColor,
    BorderColor,
    BorderHoverColor,
    PlaceholderColor,
    LabelTextColor,
    ErrorMessage,
    Placeholder,
  } = args
  return (
    <Text.Write
      questionCode={''}
      data={''}
      onSendAnswer={() => {}}
      regexPattern={''}
      errorMessage={ErrorMessage}
      parentCode={''}
      placeholderName={Placeholder}
      BackgroundColor={BackgroundColor}
      BorderColor={BorderColor}
      BorderHoverColor={BorderHoverColor}
      PlaceholderColor={PlaceholderColor}
      LabelTextColor={LabelTextColor}
      mandatory={mandatory}
      isInvalid={isInvalid}
    />
  )
}

export const Write = TextWriteTemplate.bind({})
Write.args = {
  Placeholder: 'Some Text Here..',
  mandatory: false,
  isInvalid: false,
  ErrorMessage: 'Please enter valid data.',
  BackgroundColor: '#FFFFFF',
  BorderColor: '#979797',
  BorderHoverColor: '#00AFAB',
  PlaceholderColor: '#000000',
  LabelTextColor: '#808080',
}
Write.argTypes = {
  BackgroundColor: {
    control: {
      type: 'color',
      presetColors: ['#FFFFFF', '#F4F5F5'],
    },
  },
  BorderColor: {
    control: {
      type: 'color',
      presetColors: ['#979797', '#F4F5F5'],
    },
  },
  BorderHoverColor: {
    control: {
      type: 'color',
      presetColors: ['#00AFAB', '#EF8567'],
    },
  },
  PlaceholderColor: {
    control: {
      type: 'color',
      presetColors: ['#000000', '#33475B'],
    },
  },
  LabelTextColor: {
    control: {
      type: 'color',
      presetColors: ['#808080', '#7D7D7D'],
    },
  },
}

const TextReadTemplate = args => {
  return <Text.Read data={readData} config={config} {...args} />
}
export const Read = TextReadTemplate.bind({})
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
