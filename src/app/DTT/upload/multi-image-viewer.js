import {
  Box,
  Image,
  VStack,
  HStack,
  Button,
  Text,
  Divider,
  CircularProgress,
} from '@chakra-ui/react'
import useApi from 'api'
import { useState } from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MultiImageViewer = ({ uuidList }) => {
  const { getImageSrcList } = useApi()

  const [imageVisible, setImageVisible] = useState(true)

  const srcList = getImageSrcList(uuidList, { width: 1000, height: 500 }, 'fit') || []

  const [imageIndex, setImageIndex] = useState(0)
  const imageCount = uuidList.length

  const changeImageButton = left => (
    <Button
      rounded={100}
      disabled={left ? imageIndex <= 0 : imageIndex >= imageCount - 1}
      onClick={() => {
        setImageIndex(imageIndex + (left ? -1 : 1))
        setImageVisible(false)
      }}
    >
      <FontAwesomeIcon icon={left ? faChevronLeft : faChevronRight} />
    </Button>
  )

  if (!uuidList) return null

  return (
    <Box>
      <VStack>
        <VStack height={500} justifyContent={'center'} width={'100%'}>
          <HStack
            position={'relative'}
            alignItems={'center'}
            justifyContent={'center'}
            height="100%"
            width="100%"
          >
            <CircularProgress position={'absolute'} zIndex={-1} isIndeterminate />
            <Image
              hidden={!imageVisible}
              src={srcList[imageIndex]}
              onLoad={() => setImageVisible(true)}
              position={'relative'}
              zIndex={1}
              left={-1}
            />
          </HStack>
        </VStack>
        <Divider />
        <HStack justifyItems={'center'} alignItems="center">
          {changeImageButton(true)}
          <Text>{`${imageIndex + 1}/${imageCount}`}</Text>
          {changeImageButton(false)}
        </HStack>
      </VStack>
    </Box>
  )
}

export default MultiImageViewer
