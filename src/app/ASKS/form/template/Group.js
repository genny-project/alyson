import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'

import Ask from 'app/ASKS/ask'
import Card from 'app/layouts/components/card'
import Timeline from './Timeline'

const Group = ({ label, idx, group, groups, questions, onFinish, questionCode, setGroup }) => (
  <Box w="full" key={label} display={idx === group ? 'block' : 'none'}>
    <Card>
      <Center w="full">
        <Timeline groups={groups} group={group} setGroup={setGroup} />
      </Center>

      <VStack align="start" spacing={8} key={label}>
        {groups.hasOwnProperty(idx) && <Text textStyle="head.1">{groups[idx]?.label}</Text>}
        {questions.map((type, idx) =>
          Array.isArray(type) ? (
            <HStack align="start" w="full" justify="space-between" key={idx}>
              {type.map(code => (
                <Ask onFinish={onFinish} key={code} parentCode={questionCode} questionCode={code} />
              ))}
            </HStack>
          ) : (
            <Ask onFinish={onFinish} key={type} parentCode={questionCode} questionCode={type} />
          ),
        )}
      </VStack>
    </Card>
  </Box>
)

export default Group
