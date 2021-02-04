import { Grid } from '@material-ui/core'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import Ask from './Ask'

const AsksForm = ({ questionCode }) => {
  const childAsks = useSelector(selectCode(questionCode))

  if (!childAsks) return null

  return (
    <Grid container spacing={1}>
      {childAsks.map(childAsk => (
        <Grid item key={childAsk}>
          <Ask parentCode={questionCode} questionCode={childAsk} />
        </Grid>
      ))}
    </Grid>
  )
}

export default AsksForm
