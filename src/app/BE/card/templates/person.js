import { useSelector } from 'react-redux'
import {
  Box,
  HStack,
  VStack,
  useDisclosure,
  Collapse,
  IconButton,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'
import Text from 'app/DTT/text'
import Image from 'app/DTT/upload/Image'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons'

const Person = ({ parentCode, actions, code, columns }) => {
  const title = useSelector(selectCode(code, getAttribute(columns[0])))
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1])))
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'))

  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box
      _hover={{ bg: 'blackAlpha.50' }}
      transition="all 0.2s"
      cursor="pointer"
      p="4"
      w="xs"
      h="30"
      borderWidth="1px"
      borderRadius="lg"
      onClick={onToggle}
    >
      <Flex spacing="3">
        <HStack>
          <Image.Read data={image} />
          <VStack alignItems="baseline">
            <Text.Read
              data={title}
              textProps={{
                fontWeight: 'semibold',
                as: 'h4',
                lineHeight: 'tight',
                isTruncated: true,
                maxW: '14rem',
              }}
            />
            <Text.Read
              textProps={{
                as: 'span',
                color: 'gray.600',
                fontSize: 'sm',
                isTruncated: true,
                maxW: '14rem',
              }}
              data={subTitle}
            />
          </VStack>
        </HStack>
        <Spacer />
        <ContextMenu
          actions={actions}
          code={code}
          parentCode={parentCode}
          button={<IconButton variant="ghost" icon={<FontAwesomeIcon icon={faEllipsisV} />} />}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
          hi
        </Box>
      </Collapse>
    </Box>
  )
}

export default Person
