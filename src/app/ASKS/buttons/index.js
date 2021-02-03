import { Grid } from '@material-ui/core'
import ChildButton from './ChildButton'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const AskButtons = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <Grid test-id={questionCode} container spacing={1}>
      {data.map(childCode => (
        <Grid item key={childCode}>
          <ChildButton questionCode={questionCode} childCode={childCode} />
        </Grid>
      ))}
    </Grid>
  )
}

export default AskButtons
