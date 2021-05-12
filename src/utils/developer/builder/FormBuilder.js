import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'app/layouts/components/card'
import { compose, difference, filter, flatten, identity, map, prop } from 'ramda'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectForm } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'

const FormBuilder = () => {
  const parentCode = useSelector(selectForm)
  const childAsks = useSelector(selectCode(parentCode))
  const title = useSelector(selectCode(parentCode, 'title'))
  const [config, setConfig] = useState({ subHeader: '', groups: [] })
  const [output, setOutput] = useState('')

  const updateForm = key => ({ target: { value } }) => setConfig(c => ({ ...c, [key]: value }))

  const updateGroup = (key, idx) => ({ target: { value } }) => {
    const newGroup = { ...config.groups[idx], [key]: value }
    let groups = config.groups
    groups[idx] = newGroup

    setConfig(c => ({ ...c, groups }))
  }

  const addGroup = () => setConfig(c => ({ ...c, groups: [...c.groups, { questions: [] }] }))

  const addRow = idx => () => {
    let newGroup = config.groups[idx]
    newGroup.questions = [...newGroup.questions, ['', '']]
    let groups = config.groups
    groups[idx] = newGroup

    setConfig(c => ({ ...c, groups }))
  }

  const updateQuestionCode = (groupIdx, questionIdx, rowIdx) => ({ target: { value } }) => {
    let newGroup = config.groups[groupIdx]
    if (typeof rowIdx === 'number') {
      newGroup.questions[questionIdx][rowIdx] = value
    } else {
      newGroup.questions[questionIdx] = value
    }

    let groups = config.groups
    groups[groupIdx] = newGroup

    setConfig(c => ({ ...c, groups }))
  }

  const makeConfig = () => {
    const filtered = {
      ...config,
      groups: [
        ...map(
          group => ({
            ...group,
            questions: [...map(row => filter(identity, row), group.questions)],
          }),
          config.groups,
        ),
      ],
    }
    setOutput(JSON.stringify(filtered))
  }

  const allCodes = compose(flatten, map(prop('questions')))(config.groups)

  const clear = () => {
    setConfig({ subHeader: '', groups: [] })
    setOutput('')
  }

  if (!childAsks) return null

  const notDoneChildAsks = difference(childAsks, allCodes)

  return (
    <Box w="full">
      <HStack align="start">
        <Card w="20vw" variant="card0" h="80vh" overflow="scroll">
          <VStack align="start">
            <Text>Child asks</Text>
            {notDoneChildAsks.map(childAsk => (
              <Text>{childAsk}</Text>
            ))}
          </VStack>
        </Card>

        <VStack w="full" mx="2rem">
          <Button onClick={clear}>Clear Config</Button>
          <Card w="full">
            <VStack align="start" spacing={8}>
              <Text textStyle="head.2">{title}</Text>
              <Input
                placeholder="Sub Header"
                onChange={updateForm('subHeader')}
                value={config.subHeader}
                textStyle="body.3"
              />
            </VStack>
          </Card>
          {config.groups.map(({ label, subHeader, questions }, groupIdx) => (
            <Card w="full" key={groupIdx}>
              <VStack align="start" spacing={8}>
                <Input
                  placeholder="Label"
                  textStyle="head.1"
                  value={label}
                  onChange={updateGroup('label', groupIdx)}
                />
                <Input
                  placeholder="Sub Header"
                  textStyle="head.3"
                  value={subHeader}
                  onChange={updateGroup('subHeader', groupIdx)}
                />
                {questions.map((type, questionsIdx) =>
                  Array.isArray(type) ? (
                    <HStack align="start" w="full" justify="space-between" key={questionsIdx}>
                      {type.map((code, rowIdx) => (
                        <Input
                          value={code}
                          placeholder="question_code"
                          onChange={updateQuestionCode(groupIdx, questionsIdx, rowIdx)}
                        />
                      ))}
                    </HStack>
                  ) : (
                    <Input
                      value={type}
                      placeholder="question_code"
                      onChange={updateQuestionCode(groupIdx, questionsIdx)}
                    />
                  ),
                )}
                <Button onClick={addRow(groupIdx)}>Add Row</Button>
              </VStack>
            </Card>
          ))}
          <Button onClick={addGroup} leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}>
            Add Group
          </Button>
          <Button onClick={makeConfig}>OUTPUT CONFIG</Button>
        </VStack>
      </HStack>
      {output && <Text>{output}</Text>}
    </Box>
  )
}

export default FormBuilder
