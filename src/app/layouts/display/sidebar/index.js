import { Center, VStack } from '@chakra-ui/react'
import { find, includes, reduce } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import SidebarButtons from 'app/layouts/display/sidebar/buttons/SidebarButtons'

import { SIDEBAR_WIDTH } from 'utils/constants'
import { SIDEBAR_QUESTION_CODE } from 'utils/constants'

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

  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC5,
    PRI_LOC6,
    PRI_TEMPLATE_CODE: code,
  } = mappedPcm

  const TemplateOne = () => {
    return (
      <Center w={SIDEBAR_WIDTH} bg="#224371" h="100vh">
        <VStack test-id={questionCode} justifyContent="center">
          <SidebarButtons
            key={PRI_LOC1}
            questionCode={questionCode}
            childCode={PRI_LOC1}
            iconId={mappedIconAndQuestionCode[PRI_LOC1]}
          />
          <SidebarButtons
            key={PRI_LOC2}
            questionCode={questionCode}
            childCode={PRI_LOC2}
            iconId={mappedIconAndQuestionCode[PRI_LOC2]}
          />
          <SidebarButtons
            key={PRI_LOC3}
            questionCode={questionCode}
            childCode={PRI_LOC3}
            iconId={mappedIconAndQuestionCode[PRI_LOC3]}
          />
          <SidebarButtons
            key={PRI_LOC4}
            questionCode={questionCode}
            childCode={PRI_LOC4}
            iconId={mappedIconAndQuestionCode[PRI_LOC4]}
          />
          <SidebarButtons
            key={PRI_LOC5}
            questionCode={questionCode}
            childCode={PRI_LOC5}
            iconId={mappedIconAndQuestionCode[PRI_LOC5]}
          />
          <SidebarButtons
            key={PRI_LOC6}
            questionCode={questionCode}
            childCode={PRI_LOC6}
            iconId={mappedIconAndQuestionCode[PRI_LOC6]}
          />
        </VStack>
      </Center>
    )
  }

  const DefaultTemplate = () => {
    return (
      <Center w={SIDEBAR_WIDTH} bg="#224371" h="100vh">
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

  if (!data) return null

  if (sidebarPcm) {
    if (code === 'TPL_WEST') return <TemplateOne />
  }

  return <DefaultTemplate />
}

export default SideBar
