import { HStack, Text, VStack } from '@chakra-ui/layout'
import Card from 'app/layouts/components/card'
import { zip, compose, map, prop, reduce, zipObj } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Counts = ({ sbeCodes }) => {
  const titles = compose(map(prop('value')), useSelector)(selectCode(sbeCodes, 'SCH_TITLE'))
  const counts = compose(map(prop('value')), useSelector)(selectCode(sbeCodes, 'PRI_TOTAL_RESULTS'))

  const zipper = zip(titles, counts)
  const total = reduce((prev, cur) => prev + cur[1], 0, zipper)
  const zipped = zipObj(titles, counts)

  if (total <= 0)
    return (
      <Card>
        <Text textStyle="body1">{`No students registered yet! Talk to your agent to get started.`}</Text>
      </Card>
    )
  return (
    <VStack>
      <Card>
        <VStack>
          <Text textStyle="head1">{`In Progress Students`}</Text>
          <Text textStyle="head2">{`${zipped['In Progress Students']} / ${total}`}</Text>
          <Text textStyle="head3">{`${Math.round(
            (zipped['In Progress Students'] / total) * 100,
          )}%`}</Text>
        </VStack>
      </Card>
      <HStack>
        <Card w="10rem">
          <VStack>
            <Text textStyle="head1">{`Shortlisted`}</Text>
            <Text textStyle="head2">{`${zipped['Shortlisted Students']}`}</Text>
          </VStack>
        </Card>

        <Card w="10rem">
          <VStack>
            <Text textStyle="head1">{`Interviewing`}</Text>
            <Text textStyle="head2">{`${zipped['Interviewing Students']}`}</Text>
          </VStack>
        </Card>

        <Card w="10rem">
          <VStack>
            <Text textStyle="head1">{`Offered`}</Text>
            <Text textStyle="head2">{`${zipped['Offered Students']}`}</Text>
          </VStack>
        </Card>

        <Card w="10rem">
          <VStack>
            <Text textStyle="head1">{`Placed`}</Text>
            <Text textStyle="head2">{`${zipped['Placed Students']}`}</Text>
          </VStack>
        </Card>
      </HStack>
    </VStack>
  )
}

export default Counts
