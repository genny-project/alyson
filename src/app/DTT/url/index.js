import { Link } from '@chakra-ui/react'
import { Write } from '../text'

export const Read = ({ data, size }) => (
  <Link href={data?.value} fontSize={size}>
    {data?.value}
  </Link>
)

const URL = {
  Write,
  Read,
}

export default URL
