import { VStack } from '@chakra-ui/react'
import { reduce } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import EvtButton from 'app/PCM/components/evt-button'

const TemplateSidebarOne = ({ mappedPcm }) => {
  const questionCode = mappedPcm.PRI_QUESTION_CODE
  const data = useSelector(selectCode(questionCode))
  const wholeData = useSelector(selectCode(questionCode, 'wholeData'))

  const spillLocs = getSpillLocs(mappedPcm)()

  console.log(spillLocs)

  const mappedIconAndQuestionCode = reduce((acc, { question: { code, icon } }) => {
    acc = { ...acc, [code]: icon }
    return acc
  }, {})(wholeData || [])

  const listOfQuestionCode = Object.keys(mappedIconAndQuestionCode)

  if (!data) return null

  return (
    <VStack test-id={questionCode} justifyContent="center">
      {listOfQuestionCode.map(code => (
        <EvtButton
          key={code}
          questionCode={questionCode}
          childCode={code}
          iconId={mappedIconAndQuestionCode[code]}
        />
      ))}
    </VStack>
  )
}

export default TemplateSidebarOne
