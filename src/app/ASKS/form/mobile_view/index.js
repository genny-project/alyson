import Ask from 'app/ASKS/ask'
import { VStack, Center, Text } from '@chakra-ui/react'
import { map } from 'ramda'
import Header from '../template/Header'
import FormBody from '../template/Body'

const FormMobileView = ({ title, childAsks, onFinish, questionCode, config }) => {
  if (!config.groups)
    return (
      <Center mx="8">
        <VStack spacing={8} align="start" width="full" mb={6}>
          <Text textStyle="head2" my="6">
            {title}
          </Text>
          {config?.subHeader && <Text textStyle="head3">{config.subHeader}</Text>}
          {map(childAsk => (
            <Ask
              onFinish={onFinish}
              key={childAsk}
              parentCode={questionCode}
              questionCode={childAsk}
            />
          ))(childAsks)}
        </VStack>
      </Center>
    )

  const { subHeader, groups } = config

  if (!groups) return null
  return (
    <VStack mx="2vw" spacing="4">
      <Header title={title} subHeader={subHeader} config={config} />
      <FormBody groups={groups} onFinish={onFinish} questionCode={questionCode} />
    </VStack>
  )
}

export default FormMobileView
