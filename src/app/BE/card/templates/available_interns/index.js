import { useSelector } from 'react-redux'
import {
  Box,
  HStack,
  VStack,
  IconButton,
  Flex,
  Spacer,
  useColorModeValue,
  useTheme,
  Text as CText,
} from '@chakra-ui/react'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import Text from 'app/DTT/text'
import Image from 'app/DTT/upload/Image'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import statusColors from '../status_colors'
import makeMotion from 'utils/motion'
import ImageType from 'app/DTT/upload/Image'
import getUserType from 'utils/helpers/get-user-type'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { head } from 'ramda'

const MotionBox = makeMotion(Box)

const AvailableInternCard = ({ parentCode, actions = [], code }) => {
  const theme = useTheme()
  const title = useSelector(selectCode(code, 'PRI_NAME'))
  const subTitle = useSelector(selectCode(code, 'PRI_ASSOC_OCCUPATION'))
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'))
  const statusColor = useSelector(selectCode(code, 'PRI_STATUS_COLOR'))
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))

  const [agentName, agentImage, agentCode] = useSelector(
    selectAttributes(code, [
      'PRI_LNK_AGENT__PRI_NAME',
      'PRI_LNK_AGENT__PRI_IMAGE_URL',
      'LNK_AGENT',
    ]),
  )

  const defaultColor = useColorModeValue('white', theme.colors.background.dark)
  const color = statusColors[statusColor?.value]

  const agentPerCode = head(safelyParseJson(agentCode?.value, [null]))

  return (
    <MotionBox
      bg={defaultColor}
      p="4"
      w="full"
      borderRadius="md"
      shadow="base"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1 }}
      bgColor={color}
    >
      <Flex spacing="3" w="20rem">
        <HStack>
          <Image.Read
            config={{ size: 'xl' }}
            data={image || { baseEntityCode: code }}
            parentCode={parentCode}
          />
          <VStack alignItems="baseline" w="30">
            {title?.value ? (
              <Text.Read
                data={title}
                textProps={{
                  textStyle: 'body1',
                  maxW: '16rem',
                }}
              />
            ) : (
              <CText textStyle="body3">Not yet set</CText>
            )}
            {subTitle?.value ? (
              <Text.Read
                config={{
                  as: 'span',
                  textStyle: 'body3',
                  maxW: '16rem',
                }}
                data={subTitle}
              />
            ) : (
              <CText textStyle="body3">Not yet set</CText>
            )}
          </VStack>
        </HStack>
        <Spacer minW="1rem" />
        <ContextMenu
          actions={actions}
          code={code}
          parentCode={parentCode}
          button={
            <IconButton size="xs" variant="outline" icon={<FontAwesomeIcon icon={faEllipsisV} />} />
          }
        />
      </Flex>
      {(userType === 'AGENT' || userType === 'ADMIN') && agentPerCode ? (
        <Flex w="full">
          <Spacer />
          <HStack>
            <CText textStyle="tail2">{agentName?.value}</CText>
            <ImageType.Read
              code={agentPerCode}
              config={{ size: 'sm' }}
              data={agentImage}
              parentCode={parentCode}
            />
          </HStack>
        </Flex>
      ) : null}
    </MotionBox>
  )
}

export default AvailableInternCard
