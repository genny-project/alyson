import { VStack } from '@chakra-ui/react'
import { SIDEBAR_QUESTION_CODE } from 'utils/constants'

import SidebarButtons from 'app/layouts/display/sidebar/buttons/SidebarButtons'
import isNotEmpty from 'utils/helpers/is-not-empty.js'
import { reduce } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import templateHandlerMachine from 'app/PCM/templates'
import useGetMappedPcm from 'app/PCM/helpers/get-mapped-pcm'
import { useSelector } from 'react-redux'

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

  if (isNotEmpty(mappedPcm) && templateHandlerMachine(mappedPcm)(code)(properties)) {
    return templateHandlerMachine(mappedPcm)(code)(properties)
  }

  return <DefaultTemplate {...properties} />
}

export default SideBar
