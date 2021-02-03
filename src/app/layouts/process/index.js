import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { Grid } from '@material-ui/core'

const Process = () => {
  const processCodes = useSelector(selectProcess)

  if (!processCodes) return null
  return (
    <Grid container direction="row" spacing={1} wrap="nowrap">
      {processCodes.map(sbeCode => (
        <Grid item key={sbeCode}>
          <Lane sbeCode={sbeCode} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Process
