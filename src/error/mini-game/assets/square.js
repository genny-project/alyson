import { Button } from '@chakra-ui/react'
import makeMotion from 'utils/motion'

const MotionBox = makeMotion(Button)

const Square = ({ value, onClick }) => (
  //   <MotionBox whileHover={{ scale: 1.2 }} transition={{ duration: 0.1 }}>
  <Button
    border="1px solid black"
    borderRadius="0"
    height="100%"
    width="100%"
    bg="white"
    fontSize="60px"
    cursor="pointer"
    fontWeight="800"
    onClick={onClick}
  >
    {value}
  </Button>
  //   </MotionBox>
)

export default Square
