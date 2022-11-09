import Signature from 'app/DTT/signature'

export default {
  title: 'Components/Signature',
  component: Signature,
}

const SignatureTemplate = args => {
  const {} = args

  return <Signature.Write questionCode={''} data={''} onSendAnswer={() => {}} />
}

export const Write = SignatureTemplate.bind({})
