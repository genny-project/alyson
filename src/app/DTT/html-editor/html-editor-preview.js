import { Center } from '@chakra-ui/react'
import purify from './purify'

const HtmlEditorPreview = ({ html }) => {
  if (!html) {
    return <Center>No HTML!</Center>
  }
  const clean = purify(html)
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}

export default HtmlEditorPreview
