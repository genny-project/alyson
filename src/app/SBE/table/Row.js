import { Grid, makeStyles } from '@material-ui/core'
import Cell from './Cell'
import { getAttribute } from 'app/SBE/utils/get-columns'
import ContextMenu from 'app/BE/context'

const useStyles = makeStyles(theme => ({
  row: {
    borderTop: '1px solid lightgrey',
    marginBottom: theme.spacing(1),
    transition: theme.transitions.create('background-color'),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

const Row = ({ parentCode, code, columns, actions }) => {
  const classes = useStyles()

  return (
    <ContextMenu actions={actions} code={code} parentCode={parentCode}>
      <Grid
        className={classes.row}
        spacing={1}
        container
        direction="row"
        justifyContent="flex-start"
        wrap="nowrap"
      >
        {columns.map(col => (
          <Grid key={`${code}-${col}`} item>
            <Cell code={code} attribute={getAttribute(col)} />
          </Grid>
        ))}
      </Grid>
    </ContextMenu>
  )
}

export default Row
