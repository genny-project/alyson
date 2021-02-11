import { makeStyles } from '@material-ui/core'
import { red, teal } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  progressContainer: {
    width: '90%',
    margin: 'auto',
    marginBottom: theme.spacing(1),
  },
  progressSecondary: {
    backgroundColor: red[100],
  },
  progressPrimary: {
    backgroundColor: teal[100],
  },
  barColorPrimary: {
    backgroundColor: teal[500],
  },
  barColorSecondary: {
    backgroundColor: red[500],
  },
}))

export default useStyles
