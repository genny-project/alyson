import { useSelector } from 'react-redux'
import { Box, VStack, Flex, Spacer, useColorModeValue, useTheme } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import Text from 'app/DTT/text'
import statusColors from '../status_colors'
import Action from 'app/BE/action'

const InternshipCard = ({ parentCode, actions = [], code, columns, noExpansion }) => {
  const theme = useTheme()
  const title = useSelector(selectCode(code, 'PRI_NAME'))
  const subTitle = useSelector(selectCode(code, 'PRI_ASSOC_INDUSTRY'))
  const statusColor = useSelector(selectCode(code, 'PRI_STATUS_COLOR'))

  const defaultColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark,
  )
  const color = statusColors[statusColor?.value]

  return (
    <Box bg={defaultColor} p="4" w="full" borderWidth="1px" borderRadius="lg" bgColor={color}>
      <Flex spacing="3">
        <VStack alignItems="baseline" w="20rem">
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
            <Action colorScheme="primary" code={action} parentCode={parentCode} />
          ))}
        </VStack>
      </Flex>
    </Box>
  )
}

export default InternshipCard
