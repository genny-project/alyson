import { Box, Stack, Text } from '@chakra-ui/layout'
import { Divider } from '@chakra-ui/react'
import { length, map } from 'ramda'

const ProfileItems = ({ items, direction = 'row' }) => {
  let i = 0
  return (
    <Stack direction={direction} padding={'10px'} w="full">
      {map(item => {
        i++
        return [
          <Box align="center" flex="1">
            {item.icon}
            <Text textStyle="body.3">{item.title}</Text>
          </Box>,
          <Divider orientation="vertical" hidden={i === length(items)} />,
        ]
      }, items)}
    </Stack>
  )
}

export default ProfileItems
