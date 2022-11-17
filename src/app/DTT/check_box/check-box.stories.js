import CheckBox from 'app/DTT/check_box'
import { useState } from 'react'

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
}

const WriteTemplate = args => {
  const { Required, Label, ColorScheme } = args
  const [checked, setChecked] = useState(false)

  return (
    <CheckBox.Write
      questionCode={''}
      data={{ value: checked.toString() }}
      onSendAnswer={() => {
        setChecked(!checked)
      }}
      isRequired={Required}
      label={Label}
      colorScheme={ColorScheme}
    />
  )
}

export const Write = WriteTemplate.bind({})
Write.args = {
  Label: 'Checkbox',
  Required: true,
  ColorScheme: 'primary',
}
Write.argTypes = {
  ColorScheme: {
    control: {
      type: 'inline-radio',
      options: ['primary', 'secondary', 'green', 'red', 'orange'],
      mapping: {
        Primary: 'primary',
        Secondary: 'secondary',
        Green: 'green',
        Red: 'red',
        Orange: 'orange',
      },
    },
  },
}
