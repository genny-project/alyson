import { Center, VStack } from '@chakra-ui/react'
import { reduce } from 'ramda'
import { useSelector } from 'react-redux'

import SidebarButtons from 'app/layouts/display/sidebar/buttons/SidebarButtons'
import { selectCode } from 'redux/db/selectors'
import templateHandlerMachine from 'app/PCM/templates'
import { SIDEBAR_QUESTION_CODE, SIDEBAR_WIDTH } from 'utils/constants'

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
    const template = templateHandlerMachine(code)(properties)
    if (template) {
      return template
    } else {
      console.error('Undefined template code: ' + code + '! Falling back on default')
      return <DefaultTemplate {...properties} />
    }
  }

  return <DefaultTemplate {...properties} />
}

export default SideBar
