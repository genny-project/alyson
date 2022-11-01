import Social from 'app/DTT/social'

export default {
  title: 'Components/Social',
  component: Social,
}

const SocialWrite = args => {
  const { mandatory, placeholderName } = args
  return (
    <Social.Write
      questionCode={''}
      onSendAnswer={() => {}}
      data={''}
      regexPattern={''}
      errorMessage={''}
      parentCode={''}
      placeholderName={placeholderName}
      mandatory={mandatory}
    />
  )
}

export const Write = SocialWrite.bind({})
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
