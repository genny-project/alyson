import { Center, VStack } from '@chakra-ui/react'
import { SIDEBAR_QUESTION_CODE, SIDEBAR_WIDTH } from 'utils/constants'
import { find, includes, reduce } from 'ramda'

import SidebarButtons from 'app/layouts/display/sidebar/buttons/SidebarButtons'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import templateHandlerMachine from 'app/PCM/templates'

const DefaultTemplate = ({ questionCode, listOfQuestionCode, mappedIconAndQuestionCode }) => {
  return (
    <Center w={SIDEBAR_WIDTH} bg="#224371" h="100vh" paddingInline={'3'}>
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
    </Center>
  )
}

const SideBar = () => {
  const questionCode = SIDEBAR_QUESTION_CODE
  const data = useSelector(selectCode(questionCode))
  const wholeData = useSelector(selectCode(questionCode, 'wholeData'))

  const mappedIconAndQuestionCode = reduce((acc, { question: { code, icon } }) => {
    acc = { ...acc, [code]: icon }
    return acc
  }, {})(wholeData || [])

  const listOfQuestionCode = Object.keys(mappedIconAndQuestionCode)

  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const sidebarPcmCode = find(includes('_SIDEBAR'))(allPcmCode)

  const sidebarPcm = useSelector(selectCode(sidebarPcmCode, 'allAttributes'))
  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(sidebarPcm || [])

  const { PRI_TEMPLATE_CODE: code } = mappedPcm
  const properties = { questionCode, mappedPcm, mappedIconAndQuestionCode, listOfQuestionCode }

  if (!data) return null

  if (sidebarPcm) {
    return templateHandlerMachine(code)(properties)
  }

  return <DefaultTemplate {...properties} />
}

export default SideBar
