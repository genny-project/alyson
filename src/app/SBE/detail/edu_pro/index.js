import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'

const EduProDetail = ({ sbeCode, targetCode }) => {
  const details = useSelector(selectAttributes(targetCode, []))
}
