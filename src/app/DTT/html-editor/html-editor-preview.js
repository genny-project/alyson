import { Center } from '@chakra-ui/react'
import DOMPurify from 'dompurify'
const HtmlEditorPreview = ({ html }) => {
  if (!html) {
    return <Center>No HTML!</Center>
  }

  const clean = `<div>${DOMPurify.sanitize(html)}</div>`

  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}

export default HtmlEditorPreview
