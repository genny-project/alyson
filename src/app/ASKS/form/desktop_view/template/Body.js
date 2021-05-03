import { VStack, Text } from '@chakra-ui/react'
import Ask from 'app/ASKS/ask'
import Card from 'app/layouts/components/card'

const FormBody = ({ groups, onFinish, questionCode }) => {
  return groups.map(({ label, questions }, idx) => (
    <Card key={label} w="full">
      <VStack align="start" spacing={8} key={label}>
        {groups.hasOwnProperty(idx) && <Text textStyle="head1">{groups[idx]?.label}</Text>}
        {questions.map(code => (
          <Ask onFinish={onFinish} key={code} parentCode={questionCode} questionCode={code} />
        ))}
      </VStack>
    </Card>
  ))
}

export default FormBody
