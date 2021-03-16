import { HStack, Text, VStack } from '@chakra-ui/layout'
import InternshipCard from 'app/layouts/table/intern_internship/InternshipCard'
import { always, compose, either, find, head, identity, includes, split } from 'ramda'
import { useSelector } from 'react-redux'
import { selectKeys, selectRows } from 'redux/db/selectors'

const Recommendations = () => {
  const sbeCode = compose(
    head,
    split('@'),
    either(identity, always('')),
    find(includes('SBE_INTERN_RECOMMENDATION')),
  )(useSelector(selectKeys))

  const rows = useSelector(selectRows(sbeCode))

  if (!rows) return null

  return (
    <VStack>
      <Text fontSize="xl" fontWeight="semibold">
        ✨ Congrats! ✨
      </Text>
      <Text fontWeight="semibold">
        We've matched you directly with these available Internships!
      </Text>
      <HStack>
        {rows.slice(0, 3).map(code => (
          <InternshipCard code={code} parentCode={sbeCode} />
        ))}
      </HStack>
    </VStack>
  )
}

export default Recommendations
