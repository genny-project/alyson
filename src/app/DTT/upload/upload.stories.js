import Upload from 'app/DTT/upload'

export default {
  title: 'Components/Upload',
  component: Upload,
}

const UploadWriteTemplate = args => {
  const { Placeholer, Mandatory } = args
  return (
    <Upload.Write
      questionCode={''}
      data={''}
      dttData={''}
      onSendAnswer={() => {}}
      video={''}
      name={''}
      placeholderName={Placeholer}
      mandatory={Mandatory}
    />
  )
}
export const Write = UploadWriteTemplate.bind({})
Write.argTypes = {
  Placeholer: 'Upload',
  Mandatory: true,
}

const UploadReadTemplate = args => {
  return (
    <Upload.Read
      code={''}
      data={''}
      dttData={''}
      parentCode={''}
      variant={''}
      config={{}}
      styles={''}
    />
  )
}
export const Read = UploadReadTemplate.bind({})
