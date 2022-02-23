import { Center, Text, VStack } from '@chakra-ui/react'

import Ask from 'app/ASKS/ask'
import Body from '../template/Body'
import Card from 'app/layouts/components/card'
import Header from '../template/Header'

const FormDesktopView = ({ title, onFinish, questionCode, childAsks, config = {} }) => {
  const { subHeader, groups = [], pagination } = config

  if (!groups.length)
    return (
      <Center>
        <Card maxW="50vw" w="full">
          <VStack align="start" spacing={8}>
            <Text textStyle="head.2">{title}</Text>
            {config?.subHeader && <Text textStyle="body.3">{config.subHeader}</Text>}
            {childAsks.map(code => (
              <Ask questionCode={code} parentCode={questionCode} key={`${code}-${questionCode}`} />
            ))}
          </VStack>
        </Card>
      </Center>
    )

  return (
    <Center>
      <VStack maxW="50vw" spacing="4">
        <Header title={title} subHeader={subHeader} config={config} />
        <Body
          paginated={pagination}
          groups={groups}
          onFinish={onFinish}
          questionCode={questionCode}
        />
      </VStack>
    </Center>
  )
}
export default FormDesktopView
