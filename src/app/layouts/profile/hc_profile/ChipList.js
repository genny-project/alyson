import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react'
import Chip from 'app/layouts/components/chip'
import { length, map } from 'ramda'

const ChipList = ({ title, items, parameters }) => {
  console.log('parameters ' + length(parameters))
  return (
    <Box>
      <Text textStyle={'body.3'}>{title}</Text>
      <Wrap>
        {map(chip => {
          return (
            <WrapItem>
              <Chip {...parameters}>{chip}</Chip>
            </WrapItem>
          )
        }, items)}
      </Wrap>
    </Box>
  )
}

export default ChipList
