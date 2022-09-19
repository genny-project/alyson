import { Grid, HStack, Switch, Text } from '@chakra-ui/react'
import { equals, map } from 'ramda'

const AcceptedRejectedLists = () => {
  const questionLists = [
    { label: 'Matches VISA?', value: 'Approved' },
    { label: 'Matches VISA?', value: 'Rejected' },
    { label: 'Matches Employment Contract?', value: 'Rejected' },
    { label: 'Website Investigated?', value: 'Approved' },
    { label: 'Lojing Admin Confirmed over Phone?', value: 'Approved' },
  ]

  return (
    <Grid gap="1rem">
      {map(({ label, value }) => (
        <HStack justifyContent={'space-between'}>
          <Text>{label}</Text>
          <Switch isChecked={equals('Approved')(value)} />
        </HStack>
      ))(questionLists)}
    </Grid>
  )
}

export default AcceptedRejectedLists
