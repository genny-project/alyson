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
import { getAttribute } from 'app/SBE/utils/get-columns'
import Text from 'app/DTT/text'
import Image from 'app/DTT/upload/Image'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import statusColors from './status_colors'
import MainDetails from './MainDetails'
import makeMotion from 'utils/motion'
import { head, includes } from 'ramda'
import AvailableInternCard from './available_interns'
import getUserType from 'utils/helpers/get-user-type'
import ImageType from 'app/DTT/upload/Image'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const MotionBox = makeMotion(Box)

const Card = ({ parentCode, actions = [], code, columns }) => {
  const theme = useTheme()
  const title = useSelector(selectCode(code, getAttribute(columns[0] || '')))
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1] || '')))
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

  const agentPerCode = agentCode?.value

  if (includes('SBE_AVAILABLE_INTERNS', parentCode || ''))
    return <AvailableInternCard parentCode={parentCode} actions={actions} code={code} />

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
      <Flex spacing="3">
        <HStack>
          <Image.Read
            config={{ size: 'xl' }}
            data={image || { baseEntityCode: code }}
            parentCode={parentCode}
          />
          <VStack alignItems="baseline" w="30">
            <Text.Read
              data={title}
              textProps={{
                textStyle: 'body1',
                isTruncated: true,
                maxW: '14rem',
              }}
            />
            <Text.Read
              config={{
                as: 'span',
                textStyle: 'body3',
                isTruncated: true,
                maxW: '14rem',
              }}
              data={subTitle}
            />
            <MainDetails code={code} columns={columns} parentCode={parentCode} />
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

export default Card
