import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { equals } from 'ramda'
import SBEAddSelect from './sbe-add-select'
import SBEAddText from './sbe-add-text'

const SBEAddElement = ({ parentCode, attributeCode, value, onChange, sourceCode, targetCode }) => {
  const askData = getAskFromAttribute(parentCode)(attributeCode)?.ask || {}

  return equals(askData?.question?.attribute?.dataType.component || '')('dropdown') ? (
    <SBEAddSelect
      askData={askData}
      value={value}
      onChange={onChange}
      sourceCode={sourceCode}
      targetCode={targetCode}
      parentCode={parentCode}
      attributeCode={attributeCode}
    />
  ) : (
    <SBEAddText askData={askData} value={value} onChange={onChange} />
  )
}

export default SBEAddElement
