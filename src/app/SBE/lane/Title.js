import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Title = ({ sbeCode }) => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))

  return (
    <Typography variant="h6" color="primary">
      {title.value}
    </Typography>
  )
}

export default Title
