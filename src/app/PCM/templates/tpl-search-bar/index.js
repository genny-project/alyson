import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import ProcessSearch from 'app/SBE/search/Search'

const TemplateSearchBar = ({ mappedPcm }) => {
  const questionCode = mappedPcm?.PRI_QUESTION_CODE || ''
  const attributeCode = mappedPcm?.PRI_LOC1 || ''
  const { ask } = getAskFromAttribute(questionCode)(attributeCode)

  return <ProcessSearch sourceCode={ask?.sourceCode || ''} targetCode={ask?.targetCode || ''} />
}

export default TemplateSearchBar
