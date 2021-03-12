import { useSelector } from 'react-redux'
import { Box, VStack, useColorModeValue, useTheme, Image, Text } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'
import useApi from 'api'

const Card = ({ parentCode, actions = [], code, columns }) => {
  const { getImageSrc } = useApi()
  const theme = useTheme()
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1])))
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'))

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
