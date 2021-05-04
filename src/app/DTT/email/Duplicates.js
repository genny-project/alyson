import { Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import Card from 'app/layouts/components/card'
import { split } from 'ramda'
import { useSelector } from 'react-redux'
import { selectDuplicateEmails } from 'redux/app/selectors'
import Duplicate from './Duplicate'

const Duplicates = ({ sourceCode }) => {
  const duplicates = split(',', useSelector(selectDuplicateEmails) || '')

  if (!duplicates) return null
  if (duplicates.length === 1 && !duplicates[0].length) return null

  return (
    <Card variant="card0" my="6">
      <VStack align="start">
        <Text textStyle="error">{`${duplicates.length} potential duplicate found`}</Text>
        <Wrap>
          {duplicates.map(code => (
            <WrapItem key={code}>
              <Duplicate code={code} sourceCode={sourceCode} />
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Card>
  )
}

export default Duplicates
