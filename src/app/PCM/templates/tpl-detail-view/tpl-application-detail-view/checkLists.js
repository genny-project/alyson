import { Box, Grid, HStack, Switch, Text } from '@chakra-ui/react'
import { equals, map } from 'ramda'

const CheckLists = ({ code }) => {
  const questionLists = [
    { label: 'Matches VISA?', attr: 'Approved' },
    { label: 'Matches VISA?', attr: 'Rejected' },
    { label: 'Matches Employment Contract?', attr: 'Rejected' },
    { label: 'Website Investigated?', attr: 'Approved' },
    { label: 'Lojing Admin Confirmed over Phone?', attr: 'Approved' },
  ]

  return (
    <Box display={'none'}>
      <Grid gap="1rem">
        {map(({ label, attr }) => (
          <HStack justifyContent={'space-between'}>
            <Text>{label}</Text>
            <Switch isChecked={equals('Approved')(attr)} />
          </HStack>
        ))(questionLists)}
      </Grid>
    </Box>
  )
}

export default CheckLists
