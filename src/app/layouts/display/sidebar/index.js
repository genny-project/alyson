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

  if (isNotEmpty(mappedPcm) && templateHandlerMachine(code)(properties)) {
    return templateHandlerMachine(code)(properties)
  }
  console.error('Falling back on default template for ' + code + '!')

  return <DefaultTemplate {...properties} />
}

export default SideBar
