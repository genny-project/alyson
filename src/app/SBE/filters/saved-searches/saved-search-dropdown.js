import { Select as CSelect } from 'chakra-react-select'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import mapOptions from 'app/DTT/select/map-options'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
const SavedSearchDropdown = ({ w, disabled, value, onChange, parentCode, questionCode }) => {
  const askData = useSelector(selectCode(parentCode, questionCode))
  const dropdownData =
    useSelector(
      selectCode(`${parentCode}-${questionCode}-options`),
      /// Checking this way means that if left or right is undefined, the comparison still works as expected.
      /// Without the length checks I found this comparison didn't tend to behave as expected
      (left, right) => (left?.length || -1) === (right?.length || -2),
    ) || []

  const options = mapOptions(dropdownData)

  const { name } = askData || {}

  const onSendAnswer = createSendAnswer(askData)

  const doOnChange = newOption => {
    if (!!onChange) {
      onChange(newOption)
    }
    onSendAnswer(newOption.value)
  }

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
