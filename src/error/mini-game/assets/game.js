import { useState } from 'react'
import { Box, HStack, Flex, Text, Button } from '@chakra-ui/react'
import calculateWinner from '../helpers/calculate-winner'
import Board from './board'

const Game = ({ playerOne, playerTwo = '🎅🏼', singlePlayer }) => {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [stepNumber, setStepNumber] = useState(0)
  const [playerOneTurn, setplayerOneTurn] = useState(true)
  const winner = calculateWinner(history[stepNumber])

  const getRandomElementWithNullValue = (items) => {
  const nullIndexes = items.reduce((a, e, i) => {
    if (e === null)
        a.push(i);
    return a;
}, [])
  const selectedIndex = nullIndexes[Math.floor(Math.random() * nullIndexes.length)]
  return selectedIndex
}

  const makeAiMove = (squares) => {
    console.warn('squares', squares)

    const makeMove = () => {
      const getNullIndex = getRandomElementWithNullValue(squares)
      if (getNullIndex){
      squares[getNullIndex] = playerTwo
      setplayerOneTurn(true)
      }
    }
    setTimeout(makeMove, 2000)
  }

  const handleClick = i => {
    const timeInHistory = history.slice(0, stepNumber + 1)
    const current = timeInHistory[stepNumber]
    const squares = [...current]
    singlePlayer && makeAiMove(squares)
    if (winner || squares[i]) return
    squares[i] = playerOneTurn ? playerOne : playerTwo
    setHistory([...timeInHistory, squares])
    setStepNumber(timeInHistory.length)
    setplayerOneTurn(!playerOneTurn)
  }
  const jumpTo = step => {
    setStepNumber(step)
    setplayerOneTurn(step % 2 === 0)
  }

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Move #${move}` : `Start Over`
      return (
        <HStack spacing={2}>
          <Button
            variant={destination === 'Start Over' ? 'solid' : 'ghost'}
            colorScheme="blue"
            onClick={() => jumpTo(move)}
            mt="2"
          >
            {destination}
          </Button>
        </HStack>
      )
    })
  return (
    <Flex margin="20px auto" direction="column">
      <Box mb="10">
        {winner ? (
          <>
            <Text fontSize="4xl">{`🎉  🎈  🎉  🎈  🎉  🎈  🎉  🎈  🎉`} </Text>
            <Text fontSize="4xl">{`The Winner is: ${winner} `} </Text>
          </>
        ) : (
          <Text fontSize="3xl">{`Next Player: ` + (playerOneTurn ? playerOne : playerTwo)}</Text>
        )}
      </Box>
      <Flex>
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <Box ml="20">{renderMoves()}</Box>
      </Flex>
    </Flex>
  )
}
export default Game