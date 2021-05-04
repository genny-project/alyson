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
import { selectCode } from 'redux/db/selectors'
import Text from 'app/DTT/text'
import Image from 'app/DTT/upload/Image'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import statusColors from '../status_colors'
import makeMotion from 'utils/motion'
import AgentDetail from '../AgentDetail'
import sameValue from 'redux/utils/same-value'

const MotionBox = makeMotion(Box)

const AvailableInternCard = ({ parentCode, actions = [], code }) => {
  const theme = useTheme()
  const title = useSelector(selectCode(code, 'PRI_NAME'), sameValue)
  const subTitle = useSelector(selectCode(code, 'PRI_ASSOC_OCCUPATION'), sameValue)
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'), sameValue)
  const statusColor = useSelector(selectCode(code, 'PRI_STATUS_COLOR'), sameValue)

  const defaultColor = useColorModeValue('white', theme.colors.background.dark)
  const color = statusColors[statusColor?.value]

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
                  textStyle: 'body.1',
                  maxW: '16rem',
                }}
              />
            ) : (
              <CText textStyle="body.3">Not yet set</CText>
            )}
            {subTitle?.value ? (
              <Text.Read
                config={{
                  as: 'span',
                  textStyle: 'body.3',
                  maxW: '16rem',
                }}
                data={subTitle}
              />
            ) : (
              <CText textStyle="body.3">Not yet set</CText>
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
      <AgentDetail code={code} parentCode={parentCode} />
    </MotionBox>
  )
}

export default AvailableInternCard
