import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import Row from './Row'
import Header from './Header'
import getColumns from '../utils/get-columns'
import getActions from '../utils/get-actions'
import { selectCode } from 'redux/db/selectors'

const Table = ({ parentCode, rows }) => {
  const tableData = useSelector(selectCode(parentCode))

  if (!tableData) return null

  const columns = getColumns(tableData)
  const actions = getActions(tableData)

  return (
    <Grid container wrap="nowrap" direction="column">
      <Header columns={columns} parentCode={parentCode} />
      {rows.map(row => (
        <Grid item key={`row-${row}`}>
          <Row parentCode={parentCode} code={row} columns={columns} actions={actions} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Table
