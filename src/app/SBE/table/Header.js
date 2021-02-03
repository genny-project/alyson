import { Grid } from '@material-ui/core'
import Cell from './Cell'

const Header = ({ columns, parentCode }) => {
  return (
    <Grid item spacing={1} container direction="row" justifyContent="flex-start" wrap="nowrap">
      {columns.map(col => (
        <Grid key={`${parentCode}-${col}`} item>
          <Cell showAttributeName code={parentCode} attribute={col} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Header
