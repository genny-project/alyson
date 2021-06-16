import { useSelector } from 'react-redux'
import { VStack, Flex, Button } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import Text from 'app/DTT/text'
import Attribute from 'app/BE/attribute'
import { onSendMessage } from 'vertx'
import Card from 'app/layouts/components/card'

const InternshipCard = ({ code, parentCode }) => {
  const title = useSelector(selectCode(code, 'PRI_ASSOC_INDUSTRY'))
  const subTitle = useSelector(selectCode(code, 'PRI_NAME'))

  return (
    <Card>
      <Flex>
        <VStack alignItems="baseline">
          <Text.Read
            data={title}
            config={{
              fontWeight: 'semibold',
              maxW: '25rem',
              fontSize: 'md',
            }}
          />
          <Text.Read
            config={{
              color: 'gray.400',
              fontSize: 'sm',
              maxW: '25rem',
            }}
            data={subTitle}
          />
          <Attribute code={code} attribute={'PRI_STATUS'} />
          <Button
            size="sm"
            colorScheme="primary"
            onClick={() =>
              onSendMessage({ code: 'ACT_PRI_EVENT_VIEW', targetCode: code, parentCode })
            }
          >
            View
          </Button>
        </VStack>
      </Flex>
    </Card>
  )
}

export default InternshipCard
