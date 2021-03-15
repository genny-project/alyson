import { Image } from '@chakra-ui/image'
import { Text, VStack } from '@chakra-ui/layout'
import useApi from 'api'
import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const InternshipCard = ({ code, parentCode }) => {
  const [name, img, hostCpy] = useSelector(
    selectAttributes(code, ['PRI_NAME', 'PRI_IMAGE_URL', 'PRI_ASSOC_HC']),
  )

  const { getImageSrc } = useApi()
  const src = getImageSrc(img?.value)

  return (
    <div onClick={() => onSendMessage({ code: 'PRI_EVENT_VIEW', targetCode: code, parentCode })}>
      <VStack
        _hover={{ boxShadow: '2xl' }}
        cursor="pointer"
        borderRadius="lg"
        boxShadow="md"
        w="17rem"
        p="3"
        h="18rem"
        justify="flex-end"
      >
        <Image src={src} w="10rem" />
        <Text fontWeight="semibold">{hostCpy?.value}</Text>
        <Text>{name?.value}</Text>
      </VStack>
    </div>
  )
}

export default InternshipCard
