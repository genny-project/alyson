import { useSelector } from 'react-redux'
import { Box, VStack, Flex, Spacer, useColorModeValue, useTheme } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import Text from 'app/DTT/text'
import Action from 'app/BE/action'
import Card from 'app/layouts/components/card'

const InternshipCard = ({ parentCode, actions = [], code }) => {
  const theme = useTheme()
  const title = useSelector(selectCode(code, 'PRI_NAME'))
  const subTitle = useSelector(selectCode(code, 'PRI_ASSOC_INDUSTRY'))

  const defaultColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark,
  )

  return (
    <Card bg={defaultColor} w="full" maxW={['80vw', '20rem']}>
      <Flex>
        <VStack alignItems="baseline">
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
        </VStack>
        <Spacer />
        <VStack>
          {actions.map(action => (
            <Action
              key={action}
              colorScheme="primary"
              targetCode={code}
              code={action}
              parentCode={parentCode}
            />
          ))}
        </VStack>
      </Flex>
    </Card>
  )
}

export default InternshipCard
