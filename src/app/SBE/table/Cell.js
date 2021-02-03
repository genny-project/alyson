import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Cell = ({ code, attribute, showAttributeName }) => {
  const data = useSelector(selectCode(code, attribute))

  return (
    <Typography
      noWrap
      style={{ width: '8rem', height: '1.5rem', margin: '1rem', overflow: 'hidden' }}
    >
      {showAttributeName ? data?.attributeName : data?.value || ''}
    </Typography>
  )
}

export default Cell
