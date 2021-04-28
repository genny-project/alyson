import { Flex, HStack, Spacer, Text } from '@chakra-ui/layout'
import ImageType from 'app/DTT/upload/Image'
import { useSelector } from 'react-redux'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'

const AgentDetail = ({ code, parentCode }) => {
  const userCode = useSelector(selectCode('USER'))

  const userType = getUserType(useSelector(selectCode(userCode)))

  const [agentName, agentImage, agentCode] = useSelector(
    selectAttributes(code, [
      'PRI_LNK_AGENT__PRI_NAME',
      'PRI_LNK_AGENT__PRI_IMAGE_URL',
      'LNK_AGENT',
    ]),
  )

  const agentPerCode = agentCode?.value

  return (userType === 'AGENT' || userType === 'ADMIN') && agentPerCode ? (
    <Flex w="full">
      <Spacer />
      <HStack>
        <Text textStyle="tail2">{agentName?.value}</Text>
        <ImageType.Read
          code={agentPerCode}
          config={{ size: 'sm' }}
          data={agentImage}
          parentCode={parentCode}
        />
      </HStack>
    </Flex>
  ) : null
}

export default AgentDetail
