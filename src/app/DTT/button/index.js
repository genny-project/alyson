import { Button } from '@chakra-ui/react'

const EventButton = props => {
  const { name, onClick, disabled } = props

  return (
    <Button disabled={disabled} onClick={onClick}>
      {name}
    </Button>
  )
}

export default EventButton
