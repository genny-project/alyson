import Buttons from 'app/ASKS/buttons'
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core'
import AskMenu from 'app/ASKS/menu'

const Navigation = () => {
  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Buttons questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
          </Grid>
          <Grid item>
            <AskMenu questionCode={'QUE_ADD_ITEMS_GRP'} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
