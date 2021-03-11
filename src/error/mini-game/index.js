import { Box, HStack, VStack, Flex, Text } from '@chakra-ui/react'
import Game from './assets/game'

const MiniGame = () => {
  return (
    <Flex direction="column">
      <Box m="20px auto 100px auto">
        <Text fontSize="4xl">{`Our Server is down. Please enjoy the game in the meantime!`}</Text>
      </Box>
      <Game />
    </Flex>
  )
}

export default MiniGame
