import { HStack, VStack } from '@chakra-ui/react'

import Action from 'app/BE/action'
import Card from 'app/layouts/components/card'
import Text from 'app/DTT/text'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const InternshipCard = ({ parentCode, actions = [], code }) => {
  const title = useSelector(selectCode(code, 'PRI_NAME'))
  const subTitle = useSelector(selectCode(code, 'PRI_ASSOC_INDUSTRY'))

  return (
    <Card w="full">
      <VStack alignItems="start">
        <Text.Read
          data={title}
          config={{
            fontWeight: 'semibold',
            as: 'h4',
            lineHeight: 'tight',
            isTruncated: true,
            maxW: '18rem',
          }}
        />
        <Text.Read
          config={{
            as: 'span',
            color: 'gray.600',
            fontSize: 'sm',
            isTruncated: true,
            maxW: '18rem',
          }}
          data={subTitle}
        />
        <HStack>
          {actions.map((action, index) => (
            <Action
              key={`${action}-${index}`}
              colorScheme="primary"
              targetCode={code}
              code={action}
              parentCode={parentCode}
            />
          ))}
        </HStack>
      </VStack>
    </Card>
  )
}

export default InternshipCard
