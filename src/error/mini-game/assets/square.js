import { Button } from '@chakra-ui/react'
import makeMotion from 'utils/motion'

const MotionBox = makeMotion(Button)

const Square = ({ value, onClick }) => (
  //   <MotionBox whileHover={{ scale: 1.2 }} transition={{ duration: 0.1 }}>
  <Button
    border="1px solid #1183c8"
    borderRadius="0"
    height="100%"
    width="100%"
    bg="ligthGrey"
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
