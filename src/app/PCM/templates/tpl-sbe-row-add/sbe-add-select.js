import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import mapOptions from 'app/DTT/select/map-options'
import { Select } from 'chakra-react-select'
import debounce from 'lodash.debounce'
import { isEmpty } from 'ramda'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import useProductColors from 'utils/productColors'
import { onSendMessage } from 'vertx'

const SBEAddSelect = ({
  askData,
  parentCode,
  attributeCode,
  value,
  onChange,
  sourceCode,
  targetCode,
  disabled,
}) => {
  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    borderRadius,
  } = useProductColors()

  const questionCode = askData?.questionCode || ''
  const processId = askData?.processId || ''
  const dropdownData =
    useSelector(
      selectCode(`${parentCode}-${questionCode}-options`),
      /// Checking this way means that if left or right is undefined, the comparison still works as expected.
      /// Without the length checks I found this comparison didn't tend to behave as expected
      (left, right) => (left?.length || -1) === (right?.length || -2),
    ) || []

  const options = mapOptions(dropdownData)

  const ddEvent = debounce(
    value =>
      onSendMessage(
        {
          sourceCode,
          targetCode,
          value,
          parentCode,
          questionCode,
          code: questionCode,
          processId: processId,
        },
        { event_type: 'DD', redirect: false, attributeCode, questionCode, code: questionCode },
      ),
    500,
  )

  // the backend accepts array only when sending dropdown values regardless of multi or single select
  const prepareValueForSendingAnswer = value =>
    value && Array.isArray(value) && value.map(i => i.value)

  const [askedForDropDownData, setAskedForDropDownData] = useState(false)

  const doOnChange = newValue => {
    createSendAnswer(askData, { targetCode })(prepareValueForSendingAnswer([newValue]))
    onChange(newValue)
  }

  useEffect(() => {
    /// If the dropdown data doesn't exist yet, we need to get it
    if (isEmpty(dropdownData)) {
      // If the backend returns no data, it would just loop constantly, hence this check here
      if (!askedForDropDownData) {
        ddEvent('')
        setAskedForDropDownData(true)
      }
    }
    // I found that adding options on its own to this array just caused infinite re-renders

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [askData, options?.length])

  return (
    <Select
      useBasicStyles
      onChange={doOnChange}
      options={options}
      placeholder={askData?.name}
      value={value}
      isDisabled={disabled}
      chakraStyles={{
        container: provided => ({
          ...provided,
          w: 'full',
          minW: `${askData?.name.length + 10}ch`,
        }),
        control: provided => ({
          ...provided,
          paddingInline: '0.5rem',
          paddingBlock: '0.5rem',
          bg: fieldBackgroundColor,
          borderRadius: borderRadius,
          borderColor: fieldBorderColor,
          fontSize: '0.875rem',
          fontWeight: '500',
          color: fieldTextColor,
          cursor: 'pointer',
          _hover: {
            borderColor: fieldHoverBorderColor,
            boxShadow: 'lg',
          },
          _focus: {
            borderColor: 'product.secondary',
            boxShadow: 'inherit',
          },
        }),
        menu: provided => ({
          ...provided,
          marginBlock: 0,
          paddingBlock: 0,
          border: 0,
          borderRadius: '0.25rem 0.25rem 1.25rem 1.25rem',
          boxShadow: '0px 4px 15px -2px rgba(0, 0, 0, 0.25)',
          zIndex: 100,
        }),
        menuList: provided => ({
          ...provided,
          paddingBlock: 0,
          border: 0,
          borderRadius: '0.25rem 0.25rem 1.25rem 1.25rem',
        }),
        option: provided => ({
          ...provided,
          paddingInlineStart: 10,
          paddingInlineEnd: 3,
          paddingBlock: 2,
          borderRadius: '1.25rem',
          bg: '#fff',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: fieldTextColor,
          _hover: {
            bg: 'product.secondary',
            color: '#fff',
          },
        }),
        noOptionsMessage: provided => ({
          ...provided,
          fontSize: '0.875rem',
          fontWeight: '500',
        }),
      }}
    />
  )
}

export default SBEAddSelect
