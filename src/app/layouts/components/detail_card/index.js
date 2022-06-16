import { Box, Grid, Text, VStack, useColorModeValue } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import { map } from 'ramda'

const DetailCards = ({ detailsection, currentMentor, miniCard }) => {
  const { header, attributes } = detailsection
  const cardsbg = useColorModeValue('#ffffff', 'gray.600')
  return (
    <VStack
      boxShadow="base"
      rounded="md"
      p="5"
      w={'100%'}
      alignItems="flex-start"
      bg={cardsbg}
      minH={miniCard ? '17rem' : 'inherit'}
      flex="1 1 10rem"
      height={'100%'}
    >
      <Text textStyle="head.2" mb={5}>
        {header}
      </Text>
      {map(({ attr, label }) => (
        <Grid
          templateColumns={'repeat(auto-fit, minmax(7rem, 1fr))'}
          key={`${label}-${attr}`}
          w={'100%'}
        >
          {label && <Text>{label}</Text>}
          <Box>
            <Attribute config={{ textStyle: 'body.3' }} code={currentMentor} attribute={attr} />
          </Box>
        </Grid>
      ))(attributes)}
    </VStack>
  )
}
export default DetailCards
