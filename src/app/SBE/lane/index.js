import { useSelector } from 'react-redux'
import { selectRows, selectCode } from 'redux/db/selectors'
import { Grid } from '@material-ui/core'
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
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Title sbeCode={sbeCode} />
      </Grid>
      {rows.map(row => (
        <Grid item key={row}>
          <ContextMenu code={row} parentCode={sbeCode} actions={actions}>
            <BECard columns={columns} code={row} parentCode={sbeCode} />
          </ContextMenu>
        </Grid>
      ))}
    </Grid>
  )
}

export default Lane
