import HtmlEditor from 'app/DTT/html-editor'

export default {
  title: 'Components/HTML Editor',
  component: HtmlEditor,
}

const HTMLWriteTemplate = args => {
  return (
    <HtmlEditor.Write
      questionCode={''}
      data={''}
      onSendAnswer={() => {}}
      regexPattern={''}
      errorMessage={''}
      parentCode={''}
      placeholderName={''}
      attributeCode={''}
      targetCode={''}
      mandatory={''}
    />
  )
}

export const Write = HTMLWriteTemplate.bind({})
