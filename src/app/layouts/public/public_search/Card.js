import { useSelector } from 'react-redux'
import { Box, VStack, Image, Text } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'
import useApi from 'api'

const Card = ({ parentCode, actions = [], code, columns }) => {
  const { getImageSrc } = useApi()
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1])))
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'))

  const imageSrc = getImageSrc(image?.value)

  return (
    <Box
      cursor="pointer"
      _hover={{ boxShadow: 'md' }}
      bg="rgba(0, 51, 102,0.3)"
      p="4"
      w="sm"
      h="30"
      borderRadius="lg"
    >
      <VStack spacing="3">
        <Image src={imageSrc} maxH="10rem" borderRadius="lg" />
        <Text textAlign="center" fontSize="xl" fontWeight="medium">{`${subTitle?.value}`}</Text>
      </VStack>
    </Box>
  )
}

export default Card
