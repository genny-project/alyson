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
  Text,
} from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'
import Image from 'app/DTT/upload/Image'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const Card = ({ parentCode, actions = [], code, columns }) => {
  const theme = useTheme()
  const title = useSelector(selectCode(code, 'PRI_ASSOC_HC'))
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1])))
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'))
  const address = useSelector(selectCode(code, 'PRI_ADDRESS_FULL'))

  const defaultColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark,
  )

  return (
    <Box bg={defaultColor} p="4" w="95%" h="10rem" borderWidth="1px" borderRadius="lg">
      <Flex spacing="3">
        <HStack w="28rem">
          <Image.Read data={image} config={{ size: 'xl' }} />
          <VStack alignItems="baseline" w="30">
            <Text data={title} textStyle="body.1">
              {title?.value}
            </Text>
            <Text data={title} textStyle="body.2">
              {subTitle?.value}
            </Text>
            <Text data={title} textStyle="tail.2">
              {address?.value}
            </Text>
          </VStack>
        </HStack>
        <Spacer />
        <HStack>
          <ContextMenu
            actions={actions}
            code={code}
            parentCode={parentCode}
            button={<IconButton variant="ghost" icon={<FontAwesomeIcon icon={faEllipsisV} />} />}
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Card
