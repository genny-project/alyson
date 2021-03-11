import { useState } from 'react'
import { Box, HStack, Button, VStack, Text } from '@chakra-ui/react'
import SelectCharacter from '../select-character'

const GameMode = () => {
  const [playerMode, setPlayerMode] = useState(null)
  return playerMode ? (
    <SelectCharacter playerMode={playerMode} />
  ) : (
    <VStack spacing={10}>
      <Text fontSize="2xl">{`Select the game mode:`}</Text>
      <HStack spacing={10}>
        <Box>
          <Button onClick={() => setPlayerMode('singlePlayer')}>{`Single Player Mode`}</Button>
        </Box>
        <Box>
          <Button onClick={() => setPlayerMode('multiPlayer')}>{`Multi Player Mode`}</Button>
        </Box>
      </HStack>
    </VStack>
  )
}

export default GameMode
