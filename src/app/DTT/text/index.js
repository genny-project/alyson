import { TextField, Typography } from '@material-ui/core'

export const Write = props => <TextField {...props} />
export const Read = props => <Typography>{props.value}</Typography>

const Text = {
  Write,
  Read,
}
export default Text
