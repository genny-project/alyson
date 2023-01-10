import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { equals } from 'ramda'
import SBEAddDate from './sbe-add-date'
import SBEAddSelect from './sbe-add-select'
import SBEAddText from './sbe-add-text'

const SBEAddElement = ({
  parentCode,
  attributeCode,
  value,
  onChange,
  sourceCode,
  targetCode,
  disabled,
}) => {
  const askData = getAskFromAttribute(parentCode)(attributeCode)?.ask || {}

  const component = askData?.question?.attribute?.dataType.component || ''

  return equals(component)('dropdown') && !disabled ? (
    <SBEAddSelect
      askData={askData}
      value={value}
      onChange={onChange}
      sourceCode={sourceCode}
      targetCode={targetCode}
      parentCode={parentCode}
      attributeCode={attributeCode}
      disabled={disabled}
    />
  ) : equals(component)('date') && !disabled ? (
    <SBEAddDate askData={askData} value={value} onChange={onChange} disabled={disabled} />
  ) : (
    <SBEAddText askData={askData} value={value} onChange={onChange} disabled={disabled} />
  )
}

export default SBEAddElement
