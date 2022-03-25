import { Box, Center, Stack, Text, VStack } from '@chakra-ui/layout'
import { add, compose, filter, flatten, identity, includes, map, prop } from 'ramda'
import { selectAttributes, selectCode } from 'redux/db/selectors'

import Ask from 'app/ASKS/ask'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPlayer from 'react-player'
import Timeline from './Timeline'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

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
  paginated,
  setAdjGroups,
}) => {
  const asks = flatten(questions)

  const { targetCode } = useSelector(selectCode(questionCode, 'QUE_SUBMIT'))
  const questionDatas = filter(identity, useSelector(selectAttributes(questionCode, asks)))
  const mandatoryQuestions = filter(prop('mandatory'), questionDatas)
  const mandatoryAttributes = map(prop('attributeCode'))(mandatoryQuestions)
  const attributeData = filter(
    identity,
    useSelector(selectAttributes(targetCode, mandatoryAttributes)),
  )
  const mandatoryAttributesNoValue = compose(
    map(prop('attributeCode')),
    filter(attr => !attr.value),
  )(attributeData)

  const mandatoryQuestionsNoValue = filter(
    q => q.questionCode !== 'QUE_SUBMIT' && includes(q.attributeCode, mandatoryAttributesNoValue),
  )(mandatoryQuestions)

  const disableNext = !!mandatoryQuestionsNoValue.length

  if (!paginated && !questionDatas.length) return null

  return (
    <Box display={!paginated || idx === group ? 'block' : 'none'} w="full" key={label}>
      <Card shadow={'md'}>
        <Center w="full">
          {paginated && (
            <Timeline
              setAdjGroups={setAdjGroups}
              questionCode={questionCode}
              groups={groups}
              group={group}
              setGroup={setGroup}
              disableNext={disableNext}
            />
          )}
        </Center>

        <VStack align="start" spacing={8}>
          <Text textStyle="head.1">{label}</Text>
          {subHeader && <Text textStyle="head.3">{subHeader}</Text>}
          {video && <ReactPlayer url={video.url} />}
          {flatten(questions).map((type, idx) =>
            Array.isArray(type) ? (
              <Stack direction={'column'} align="start" w="full" key={idx}>
                {type.map(code => (
                  <Ask
                    onFinish={onFinish}
                    key={code}
                    parentCode={questionCode}
                    questionCode={code}
                  />
                ))}
              </Stack>
            ) : (
              <Ask onFinish={onFinish} key={type} parentCode={questionCode} questionCode={type} />
            ),
          )}
          <Center w="full" display={!paginated || idx === groups.length - 1 ? 'none' : 'block'}>
            <VStack>
              <Button
                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                size="lg"
                disabled={disableNext}
                variant="primary"
                onClick={() => setGroup(add(1))}
              >
                Next
              </Button>
              <Text textStyle="tail.error" display={!disableNext ? 'none' : 'block'}>
                Please fill out all mandatory questions
              </Text>
            </VStack>
          </Center>
        </VStack>
      </Card>
    </Box>
  )
}

export default Group
