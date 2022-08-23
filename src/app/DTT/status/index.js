import { Badge } from '@chakra-ui/react'

const Read = ({ data, config }) => {
  const value = data?.value
  console.log('test')

  if (!data) return null

  const colorScheme =
    value === 'APPROVED' || value === 'AVAILABLE' || value === 'ACTIVE'
      ? 'green'
      : value === 'PROGRESS'
      ? 'purple'
      : 'red'

  return (
    <Badge {...config} colorScheme={colorScheme}>
      {value}
    </Badge>
  )
}

const Status = {
  Read,
}

export default Status
