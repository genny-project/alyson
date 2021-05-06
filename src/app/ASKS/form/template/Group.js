import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'

import Ask from 'app/ASKS/ask'
import Card from 'app/layouts/components/card'
import ReactPlayer from 'react-player'
import Timeline from './Timeline'

const Group = ({
  label,
  video,
  subHeader,
  idx,
  group,
  groups,
  questions = [],
  onFinish,
  questionCode,
  setGroup,
}) => (
  <Box w="full" key={label} display={idx === group ? 'block' : 'none'}>
    <Card>
      <Center w="full">
        <Timeline groups={groups} group={group} setGroup={setGroup} />
      </Center>

      <VStack align="start" spacing={8}>
        <Text textStyle="head.1">{label}</Text>
        <Text textStyle="head.3">{subHeader}</Text>
        {video && <ReactPlayer url={video.url} />}
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
