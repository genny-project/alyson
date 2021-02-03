import { useSelector } from 'react-redux'
import { selectRows, selectCode } from 'redux/db/selectors'
import { Grid, Typography } from '@material-ui/core'
import getColumns from '../utils/get-columns'
import getActions from '../utils/get-actions'
import ContextMenu from 'app/BE/context'
import BECard from 'app/BE/card'
import Title from './Title'

const Lane = ({ sbeCode }) => {
  const table = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  if (!table || !rows) return null

  const columns = getColumns(table)
  const actions = getActions(table)

  return (
    <Grid container direction="column">
      <Title sbeCode={sbeCode} />
      {rows.map(row => (
        <ContextMenu key={row} code={row} parentCode={sbeCode} actions={actions}>
          <BECard columns={columns} code={row} parentCode={sbeCode} />
        </ContextMenu>
      ))}
    </Grid>
  )
}

export default Lane
