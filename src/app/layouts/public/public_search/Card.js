import { useSelector } from 'react-redux'
import {
  Box,
  VStack,
  useDisclosure,
  IconButton,
  useColorModeValue,
  useTheme,
  Image,
  Text,
} from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'

import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faInfo } from '@fortawesome/free-solid-svg-icons'
import PickedAttribute from 'app/SBE/lane/PickedAttribute'
import useApi from 'api'

const Card = ({ parentCode, actions = [], code, columns }) => {
  const { getImageSrc } = useApi()
  const theme = useTheme()
  const title = useSelector(selectCode(code, 'PRI_ASSOC_HC'))
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1])))
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'))

  const { isOpen, onToggle } = useDisclosure()

  const defaultColor = useColorModeValue(
    theme.colors.background.light,
    theme.colors.background.dark,
  )

  const imageSrc = getImageSrc(image?.value)

  return (
    <Box
      cursor="pointer"
      _hover={{ boxShadow: 'md' }}
      bg={defaultColor}
      p="4"
      w="sm"
      h="30"
      borderWidth="1px"
      borderRadius="lg"
    >
      <VStack spacing="3">
        <Image src={imageSrc} maxH="10rem" />
        <Text textAlign="center" fontSize="xl" fontWeight="medium">{`${subTitle?.value}`}</Text>
      </VStack>
    </Box>
  )
}

export default Card
