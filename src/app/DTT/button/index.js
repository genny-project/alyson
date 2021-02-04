import { Button } from '@material-ui/core'

const EventButton = props => {
  const { name, onClick, disabled } = props

  return (
    <Button disabled={disabled} onClick={onClick}>
      {name}
    </Button>
  )
}

export default EventButton
