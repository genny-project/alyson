import Ask from 'app/ASKS/ask'
import { VStack, Text, Box } from '@chakra-ui/react'
import { map } from 'ramda'
import Header from '../template/Header'
import FormBody from '../template/Body'

const FormMobileView = ({ title, childAsks, onFinish, questionCode, config }) => {
  if (!config.groups)
    return (
      <Box>
        <Text w="full" textAlign="center" textStyle="head.1" my="3">
          {title}
        </Text>
        <VStack spacing={8} align="start" width="full" mb={6}>
          {config?.subHeader && <Text textStyle="head.3">{config.subHeader}</Text>}
          {map(childAsk => (
            <Ask
              onFinish={onFinish}
              key={childAsk}
              parentCode={questionCode}
              questionCode={childAsk}
            />
          ))(childAsks)}
        </VStack>
      </Box>
    )

  const { subHeader, groups } = config

  if (!groups) return null
  return (
    <VStack width="96%" mx="2vw" spacing="4">
      <Header title={title} subHeader={subHeader} config={config} />
      <FormBody groups={groups} onFinish={onFinish} questionCode={questionCode} />
    </VStack>
  )
}

export default FormMobileView
