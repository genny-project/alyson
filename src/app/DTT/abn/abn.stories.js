import ABN from 'app/DTT/abn'

export default {
  title: 'Components/ABN',
  component: ABN,
}

const ABNTemplate = args => {
  const { mandatory, disabled } = args
  return (
    <ABN.Write
      questionCode={''}
      data={''}
      onSendAnswer={() => {}}
      regexPattern={''}
      errorMessage={''}
      parentCode={''}
      mandatory={mandatory}
      disabled={disabled}
      inputmask={''}
    />
  )
}

export const Write = ABNTemplate.bind({})
Write.args = {
  mandatory: true,
  disabled: false,
}
