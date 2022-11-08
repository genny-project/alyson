import Address from 'app/DTT/address'

export default {
  title: 'Components/Address',
  component: Address,
}

const AddressWriteTemplate = args => {
  const { Placeholder, Mandatory } = args
  return (
    <Address.Write
      questionCode={''}
      onSendAnswer={() => {}}
      data={''}
      placeholderName={Placeholder}
      mandatory={Mandatory}
    />
  )
}
export const Write = AddressWriteTemplate.bind({})
Write.args = {
  Mandatory: true,
  Placeholder: 'Enter a location',
}

const AddressReadTemplate = args => {
  const { Data, HideIcon, Collapse } = args
  return <Address.Read data={{ value: Data }} config={{ hideIcon: HideIcon, collapse: Collapse }} />
}
export const Read = AddressReadTemplate.bind({})
Read.args = {
  Data: 'Queensland, Australia',
  HideIcon: true,
  Collapse: true,
}
Read.argTypes = {
  Data: 'string',
}
