import { Box } from '@chakra-ui/react'
import Square from './square'

const Board = ({ squares, onClick }) => (
  <Box
    width="500px"
    height="500px"
    margin="0 auto"
    display="grid"
    gridTemplate="repeat(3, 1fr) / repeat(3, 1fr)"
  >
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </Box>
)

export default Board
