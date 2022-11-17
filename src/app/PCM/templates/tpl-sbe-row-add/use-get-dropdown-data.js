import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const useGetDropdownData = (parentCode, questionCode) =>
  useSelector(
    selectCode(`${parentCode}-${questionCode}-options`),
    /// Checking this way means that if left or right is undefined, the comparison still works as expected.
    /// Without the length checks I found this comparison didn't tend to behave as expected
    (left, right) => (left?.length || -1) === (right?.length || -2),
  ) || []

export default useGetDropdownData
