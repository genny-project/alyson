import { VStack } from '@chakra-ui/react'
import { SIDEBAR_QUESTION_CODE } from 'utils/constants'
import { reduce } from 'ramda'

import SidebarButtons from 'app/layouts/display/sidebar/buttons/SidebarButtons'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TemplateSidebar = () => {
  const questionCode = SIDEBAR_QUESTION_CODE
  const data = useSelector(selectCode(questionCode))
  const wholeData = useSelector(selectCode(questionCode, 'wholeData'))

  const mappedIconAndQuestionCode = reduce((acc, { question: { code, icon } }) => {
    acc = { ...acc, [code]: icon }
    return acc
  }, {})(wholeData || [])

  const listOfQuestionCode = Object.keys(mappedIconAndQuestionCode)

  if (!data) return null

  return (
    <VStack test-id={questionCode} justifyContent="center">
      {listOfQuestionCode.map(code => (
        <SidebarButtons
          key={code}
          questionCode={questionCode}
          childCode={code}
          iconId={mappedIconAndQuestionCode[code]}
        />
      ))}
    </VStack>
  )
}

export default TemplateSidebar
