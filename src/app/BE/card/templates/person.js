import { useSelector } from 'react-redux'
import { Box, HStack, VStack } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'
import Text from 'app/DTT/text'
import Image from 'app/DTT/upload/Image'

const Person = ({ parentCode, code, columns }) => {
  const title = useSelector(selectCode(code, getAttribute(columns[0])))
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1])))
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'))

  return (
    <Box
      _hover={{ bg: 'gray.50' }}
      cursor="context-menu"
      p="4"
      w="xs"
      h="30"
      borderWidth="1px"
      borderRadius="lg"
    >
      <HStack spacing="3">
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
    </Box>
  )
}

export default Person
