import { Button } from '@chakra-ui/react'

const Square = ({ value, onClick }) => (
  <Button
    border="1px solid black"
    borderRadius="0"
    height="100%"
    width="100%"
    bgGradient="linear(to-l, whiteSmoke, silver)"
    fontSize="60px"
    cursor="pointer"
    fontWeight="800"
    onClick={onClick}
  >
    {value}
  </Button>
)

export default Square
