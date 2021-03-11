import { Box, Flex, Text } from '@chakra-ui/react'
import GameMode from './game-mode'

const MiniGame = () => {
  return (
    <Flex direction="column" w="80%" m="auto">
      <Box m="20px auto 100px auto">
        <Text
          bgGradient="linear(to-l, blue, #1183c8)"
          bgClip="text"
          fontSize="4xl"
        >{`Our Server is down. Please enjoy the game in the meantime!`}</Text>
      </Box>
      <GameMode />
    </Flex>
  )
}

export default MiniGame
