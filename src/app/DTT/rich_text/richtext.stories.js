import RichText from 'app/DTT/rich_text'

export default {
  title: 'Components/Rich Text',
  component: RichText,
}

const RichTextWrite = args => {
  const { Mandatory, Placeholder } = args
  return (
    <RichText.Write
      parentCode={''}
      questionCode={''}
      regexPattern={''}
      errorMessage={''}
      data={''}
      placeholderName={Placeholder}
      onSendAnswer={() => {}}
      mandatory={Mandatory}
      html={''}
    />
  )
}

export const Write = RichTextWrite.bind({})
Write.args = {
  Mandatory: false,
  Placeholder: 'Enter Value',
}

const RichTextRead = args => {
  const { Data, Mini } = args
  return <RichText.Read data={Data} mini={Mini} config={{}} />
}
export const Read = RichTextRead.bind({})
Read.args = {
  Mini: true,
  Data: { value: '<h1>Header Text Goes Here</h1>' },
}
