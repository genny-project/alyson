import { includes } from 'ramda'
import { Link } from '@chakra-ui/react'
import { Write } from '../text'

export const Read = ({ data, size }) => {
  if (!data?.value) return null

  const href = includes('http', data.value) ? data.value : `https://${data.value}`

  return (
    <Link href={href} fontSize={size}>
      {data?.value}
    </Link>
  )
}

const URL = {
  Write,
  Read,
}

export default URL
