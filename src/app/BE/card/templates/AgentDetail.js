import { Flex, HStack, Spacer, Text } from '@chakra-ui/layout'
import ImageType from 'app/DTT/upload/Image'
import { always, equals } from 'ramda'
import { useSelector } from 'react-redux'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import sameLength from 'redux/utils/same-length'
import getUserType from 'utils/helpers/get-user-type'

const AgentDetail = ({ code, parentCode }) => {
  const userCode = useSelector(selectCode('USER'), equals)

  const userType = getUserType(useSelector(selectCode(userCode), sameLength))

  const [agentName, agentImage, agentCode] = useSelector(
    selectAttributes(code, [
      'PRI_LNK_AGENT__PRI_NAME',
      'PRI_LNK_AGENT__PRI_IMAGE_URL',
      'LNK_AGENT',
    ]),
    always(true),
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
