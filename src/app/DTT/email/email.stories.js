import Email from 'app/DTT/email'

export default {
  component: Email,
  title: 'Components/Email',
}

const regexPattern = '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/'

const TemplateWrite = args => {
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
    <Email.Write
      questionCode={''}
      data={''}
      onSendAnswer={() => {}}
      regexPattern={regexPattern}
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

export const Write = TemplateWrite.bind({})
Write.args = {
  Placeholder: 'Enter email address',
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

const TemplateRead = args => {
  const { Color, EmailAdd } = args
  return <Email.Read data={{ value: EmailAdd }} Color={Color} />
}
export const Read = TemplateRead.bind({})
Read.args = {
  Color: '#000000',
  EmailAdd: 'digesh.bajracharya@gada.io',
}
Read.argTypes = {
  EmailAdd: {
    control: 'text',
  },
  Color: {
    control: {
      type: 'color',
      presetColors: ['#000000', '#33475B'],
    },
  },
}
