import { useState } from 'react'
import { Box, Flex, HStack, Text, VStack, Button, Spacer } from '@chakra-ui/react'
import { map } from 'ramda'
import Game from '../assets/game'

const characters = ['🐶', '🐱', '🐭', '🐷', '🐯', '🐼', '🦁']

const SelectCharacter = () => {
  const [playerOne, setPlayerOne] = useState(null)
  const [playerTwo, setPlayerTwo] = useState(null)
  const [showCharacterSelection, setShowCharacterSelection] = useState(true)

  return showCharacterSelection ? (
    <VStack spacing="20">
      <Flex>
        <Box mr="20">
          <VStack spacing="5">
            <Text
              bgGradient="linear(to-r, black, red)"
              bgClip="text"
              fontSize="2xl"
            >{`Choose Player One`}</Text>
            <HStack VStack spacing="4">
              {map(character => (
                <Button
                  size="lg"
                  onClick={() => setPlayerOne(character)}
                  isDisabled={character === playerTwo}
                >
                  {character}
                </Button>
              ))(characters)}
            </HStack>
            {playerOne ? (
              <Text fontSize="2xl">{`Selected Character: ${playerOne}`}</Text>
            ) : (
              <Text fontSize="2xl">{`Selected Character: Not Selected`}</Text>
            )}
          </VStack>
        </Box>
        <Spacer />
        <Text bgGradient="linear(to-l, blue, red)" bgClip="text" fontSize="4xl">{`VS`}</Text>
        <Spacer />
        <Box ml="20">
          <VStack spacing="5">
            <Text
              bgGradient="linear(to-r, black, blue)"
              bgClip="text"
              fontSize="2xl"
            >{`Choose Player Two`}</Text>
            <HStack VStack spacing="4">
              {map(character => (
                <Button
                  size="lg"
                  onClick={() => setPlayerTwo(character)}
                  isDisabled={character === playerOne}
                >
                  {character}
                </Button>
              ))(characters)}
            </HStack>
            {playerTwo ? (
              <Text fontSize="2xl">{`Selected Character: ${playerTwo}`}</Text>
            ) : (
              <Text fontSize="2xl">{`Selected Character: Not Selected`}</Text>
            )}
          </VStack>
        </Box>
      </Flex>
      <Box w="100%" textAlign="end">
        <Button
          w="fit-content"
          minWidth="15rem"
          colorScheme="blue"
          isDisabled={!(playerOne && playerTwo)}
          onClick={() => setShowCharacterSelection(false)}
        >{`Next`}</Button>
      </Box>
    </VStack>
  ) : (
    <Game playerOne={playerOne} playerTwo={playerTwo} />
  )
}

export default SelectCharacter
