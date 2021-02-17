import { Badge } from '@chakra-ui/react'

const Read = ({ data }) => {
  const value = data?.value

  if (!data) return null

  const colorScheme =
    value === 'AVAILABLE' || value === 'ACTIVE' ? 'green' : value === 'PROGRESS' ? 'purple' : 'red'

  return <Badge colorScheme={colorScheme}>{value}</Badge>
}

const Status = {
  Read,
}

export default Status
