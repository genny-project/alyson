import { Stack, Text, VStack } from '@chakra-ui/layout'
import Card from 'app/layouts/components/card'
import { zip, compose, map, prop, reduce, zipObj } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodes } from 'redux/db/selectors'

const Counts = ({ sbeCodes }) => {
  const titles = compose(map(prop('value')), useSelector)(selectCodes(sbeCodes, 'SCH_TITLE'))
  const counts = compose(
    map(prop('value')),
    useSelector,
  )(selectCodes(sbeCodes, 'PRI_TOTAL_RESULTS'))

  if (!titles) return null
  const zipper = zip(titles, counts)
  const total = reduce((prev, cur) => prev + cur[1], 0, zipper)
  const zipped = zipObj(titles, counts)

  if (total <= 0)
    return (
      <Card>
        <Text textStyle="body.1">{`No students registered yet! Talk to your agent to get started.`}</Text>
      </Card>
    )
  return (
    <VStack>
      <Card>
        <VStack>
          <Text textStyle="head.1">{`In Progress Students`}</Text>
          <Text textStyle="head.2">{`${zipped['In Progress Students']} / ${total}`}</Text>
          <Text textStyle="head.3">{`${Math.round(
            (zipped['In Progress Students'] / total) * 100,
          )}%`}</Text>
        </VStack>
      </Card>
      <Stack direction={['column', 'row']}>
        <Card w="10rem">
          <VStack>
            <Text textStyle="head.1">{`Shortlisted`}</Text>
            <Text textStyle="head.2">{`${zipped['Shortlisted Students']}`}</Text>
          </VStack>
        </Card>

        <Card w="10rem">
          <VStack>
            <Text textStyle="head.1">{`Interviewing`}</Text>
            <Text textStyle="head.2">{`${zipped['Interviewing Students']}`}</Text>
          </VStack>
        </Card>

        <Card w="10rem">
          <VStack>
            <Text textStyle="head.1">{`Offered`}</Text>
            <Text textStyle="head.2">{`${zipped['Offered Students']}`}</Text>
          </VStack>
        </Card>

        <Card w="10rem">
          <VStack>
            <Text textStyle="head.1">{`Placed`}</Text>
            <Text textStyle="head.2">{`${zipped['Placed Students']}`}</Text>
          </VStack>
        </Card>
      </Stack>
    </VStack>
  )
}

export default Counts
