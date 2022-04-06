import { Center, VStack } from '@chakra-ui/react'
import { SIDEBAR_QUESTION_CODE, SIDEBAR_WIDTH } from 'utils/constants'
import { reduce } from 'ramda'

import SidebarButtons from 'app/layouts/display/sidebar/buttons/SidebarButtons'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import templateHandlerMachine from 'app/PCM/templates'
import useGetMappedPcm from 'app/PCM/helpers/get-mapped-pcm'
import isNotEmpty from 'utils/helpers/is-not-empty.js'

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

  const mappedPcm = useGetMappedPcm('_SIDEBAR')

  const { PRI_TEMPLATE_CODE: code } = mappedPcm
  const properties = { questionCode, mappedPcm, mappedIconAndQuestionCode, listOfQuestionCode }

  if (!data) return null

  if (isNotEmpty(mappedPcm)) {
    return templateHandlerMachine(code)(properties)
  }

  return <DefaultTemplate {...properties} />
}

export default SideBar
