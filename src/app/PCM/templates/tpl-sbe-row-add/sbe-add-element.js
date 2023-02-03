import getAskFromAttribute from 'app/PCM/helpers/get-ask-from-attribute'
import { compose, equals, and } from 'ramda'
import debugOut from 'utils/debug-out'
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

  if (component === '') {
    debugOut.warn(`Component for ${attributeCode} was empty! Defaulting to a text component`)
  }

  const isComponent = compose(and(!disabled), equals(component))

  return isComponent('dropdown') ? (
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
  ) : isComponent('date') ? (
    <SBEAddDate askData={askData} value={value} onChange={onChange} disabled={disabled} />
  ) : (
    <SBEAddText askData={askData} value={value} onChange={onChange} disabled={disabled} />
  )
}

export default SBEAddElement
