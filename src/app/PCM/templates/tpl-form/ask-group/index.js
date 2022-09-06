import { Box, Text } from '@chakra-ui/react'
import { isEmpty } from 'ramda'

import debugOut from 'utils/debug-out'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import FormAsk from 'app/PCM/templates/tpl-form/form-ask'

const AskGroup = ({ questionCode, level, properties }) => {
  const childAsks = useSelector(selectCode(questionCode)) || []
  const title = useSelector(selectCode(questionCode, 'title')) || ''

  if (isEmpty(childAsks)) {
    debugOut.error(`${questionCode} has no child asks! (AskGroup in TPL_FORM)`)
  }
  return (
    <Box w="min(100%, 38.75rem)">
      <Text fontWeight={'bold'} fontSize={'2.25rem'} marginBlock={8}>
        {title}
      </Text>
      {childAsks.map(code => (
        <FormAsk
          key={`${questionCode}-${code}`}
          parentCode={questionCode}
          questionCode={code}
          properties={properties}
        />
      ))}
    </Box>
  )
}

export default AskGroup