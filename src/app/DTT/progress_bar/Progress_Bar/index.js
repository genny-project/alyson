import React from 'react'
import { LinearProgress, Typography } from '@material-ui/core'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useStyles from './styles'

const ProgressBar = props => {
  const { value } = props

  const { completedPercentage = 0, completedJournals = 0 } = safelyParseJson(value)

  const completedJournalsPercentage = (() => {
    try {
      // eslint-disable-next-line no-eval
      return eval(completedJournals) * 100
    } catch (e) {
      console.error(e)
    }
  })()

  const classes = useStyles({
    progressBar1: completedPercentage,
    progressBar2: completedJournalsPercentage,
  })
  return (
    <div>
      <div className={classes.progressContainer}>
        <Typography
          style={{ textTransform: 'none', marginBottom: '0.3rem', fontSize: '0.9rem' }}
          variant="subtitle1"
          color="textSecondary"
        >{`Internship progress`}</Typography>
        <LinearProgress
          classes={{
            colorPrimary: classes.progressPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
          color="primary"
          variant="determinate"
          value={completedPercentage}
        />
      </div>
      <div className={classes.progressContainer}>
        <Typography
          style={{ textTransform: 'none', marginBottom: '0.3rem', fontSize: '0.9rem' }}
          variant="subtitle1"
          color="textSecondary"
        >{`Journal progress ${completedJournals}`}</Typography>
        <LinearProgress
          classes={{
            colorSecondary: classes.progressSecondary,
            barColorSecondary: classes.barColorSecondary,
          }}
          color={completedPercentage > completedJournalsPercentage ? 'secondary' : 'primary'}
          variant="determinate"
          value={completedJournalsPercentage}
        />
      </div>
    </div>
  )
}

export default ProgressBar
