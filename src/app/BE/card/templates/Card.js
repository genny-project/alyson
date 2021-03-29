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
} from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'
import Text from 'app/DTT/text'
import Image from 'app/DTT/upload/Image'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import statusColors from './status_colors'
import MainDetails from './MainDetails'
import makeMotion from 'utils/motion'

const MotionBox = makeMotion(Box)

const Card = ({ parentCode, actions = [], code, columns }) => {
  const theme = useTheme()
  const title = useSelector(selectCode(code, getAttribute(columns[0] || '')))
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1] || '')))
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'))
  const statusColor = useSelector(selectCode(code, 'PRI_STATUS_COLOR'))

  const defaultColor = useColorModeValue('white', theme.colors.background.dark)
  const color = statusColors[statusColor?.value]

  return (
    <MotionBox
      bg={defaultColor}
      p="4"
      w="full"
      borderRadius="md"
      shadow="md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1 }}
      bgColor={color}
    >
      <Flex spacing="3">
        <HStack>
          <Image.Read config={{ size: 'xl' }} data={image} parentCode={parentCode} />
          <VStack alignItems="baseline" w="30">
            <Text.Read
              data={title}
              textProps={{
                textStyle: 'head2',
                isTruncated: true,
                maxW: '14rem',
              }}
            />
            <Text.Read
              config={{
                as: 'span',
                color: 'gray.600',
                textStyle: 'body2',
                isTruncated: true,
                maxW: '14rem',
              }}
              data={subTitle}
            />
            <MainDetails code={code} columns={columns} parentCode={parentCode} />
          </VStack>
        </HStack>
        <Spacer />
        <ContextMenu
          actions={actions}
          code={code}
          parentCode={parentCode}
          button={
            <IconButton size="xs" variant="outline" icon={<FontAwesomeIcon icon={faEllipsisV} />} />
          }
        />
      </Flex>
    </MotionBox>
  )
}

export default Card
