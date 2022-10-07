import { Select as CSelect } from 'chakra-react-select'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import mapOptions from 'app/DTT/select/map-options'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { useEffect, useRef } from 'react'
import notEqual from 'utils/helpers/not-equal'
import { equals, find } from 'ramda'

const SavedSearchDropdown = ({
  w,
  disabled,
  value,
  onChange,
  parentCode,
  questionCode,
  sendAnswers,
}) => {
  const askData = useSelector(selectCode(parentCode, questionCode))
  const dropdownData =
    useSelector(
      selectCode(`${parentCode}-${questionCode}-options`),
      /// Checking this way means that if left or right is undefined, the comparison still works as expected.
      /// Without the length checks I found this comparison didn't tend to behave as expected
      (left, right) => (left?.length || -1) === (right?.length || -2),
    ) || []

  const options = mapOptions(dropdownData)

  const getValueFromCode = value => {
    return find(option => equals(option.value)(value.value))(options)
  }

  value = getValueFromCode(value)

  const previousVal = useRef(value)

  const { name } = askData || {}

  const onSendAnswer = answer => {
    if (sendAnswers) {
      createSendAnswer(askData)(answer)
    }
  }

  const doOnChange = newOption => {
    if (!!onChange) {
      onChange(newOption)
    }
    onSendAnswer(newOption.value)
  }

  useEffect(() => {
    if (notEqual(previousVal.current?.value)(value?.value)) {
      previousVal.current = value
      if (!!value) {
        onSendAnswer(value?.value)
      }
    }
  })

  return (
    <CSelect
      isDisabled={disabled}
      onChange={doOnChange}
      value={value}
      options={options}
      chakraStyles={{
        input: provided => ({
          ...provided,
          w: w,
        }),
      }}
      placeholder={name}
    />
  )
}

export default SavedSearchDropdown
