import {
  AspectRatio,
  Avatar,
  Button,
  ButtonGroup,
  CloseButton,
  HStack,
  Box,
  Image,
  Tooltip,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import { compose, isEmpty, map, min, not } from 'ramda'
import { faUpload, faUserAlt, faCamera } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Snap from './Snap'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useProductColors from 'utils/productColors'
import { useTheme } from '@emotion/react'

import { faImages } from '@fortawesome/free-solid-svg-icons'

const Write = ({
  questionCode,
  data,
  openDropzone,
  dropzone,
  onSendAnswer,
  handleSave,
  setLoading,
  name,
  multiUpload,
}) => {
  const { getImageSrcList } = useApi()
  const src = getImageSrcList(data?.value)
  const displayImages = !!src && Array.isArray(src) && compose(not, isEmpty)(src)

  const [openSnap, setOpenSnap] = useState(false)
  const onRemoveImage = () => {
    onSendAnswer('')
  }

  return (
    <div id={questionCode}>
      {openSnap && (
        <Snap handleSave={handleSave} setOpenSnap={setOpenSnap} setLoading={setLoading} />
      )}
      {displayImages && (
        <HStack mb="2">
          <HStack>
            {map(individualImageSrc => <Avatar size="xl" src={individualImageSrc} />)(src)}
          </HStack>
          <Tooltip label="Click to remove your selections.">
            <CloseButton cursor="pointer" onClick={onRemoveImage} />
          </Tooltip>
        </HStack>
      )}
      <div hidden={dropzone || openSnap}>
        <ButtonGroup>
          <Button
            test-id={questionCode}
            onClick={openDropzone}
            leftIcon={<FontAwesomeIcon icon={faUpload} />}
          >
            {name}
          </Button>
          {!multiUpload && (
            <Button
              onClick={() => setOpenSnap(true)}
              leftIcon={<FontAwesomeIcon icon={faCamera} />}
              hidden={dropzone}
            >
              {`Take Photo`}
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  )
}

const Read = ({ code, data, parentCode, variant, config, multiUpload }) => {
  const { getImageSrc, getImageSrcList } = useApi()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const src = getImageSrc(data?.value, { height: '500', width: '500' })
  const srcList =
    getImageSrcList(safelyParseJson(data?.value), { height: '500', width: '500' }, 'cover') || []

  const { cardDisplay } = config || ''

  const name = useSelector(selectCode(data?.baseEntityCode, 'PRI_NAME'))
  const assocName = useSelector(selectCode(data?.baseEntityCode, 'PRI_INTERN_NAME'))
  const viewDetail = () =>
    parentCode
      ? onSendMessage({
          parentCode,
          targetCode: code || data.baseEntityCode,
          code: 'ACT_PRI_EVENT_VIEW',
        })
      : null

  const theme = useTheme()
  const { buttonBackgroundColor } = useProductColors()

  const bg = useColorModeValue('gray.300', 'gray.600')
  if (variant === 'profile_image') {
    return <Image {...config} src={src} alt="profile-picture" w="10rem" borderRadius="xl" />
  }

  const imagePreviewCount = min(srcList.length, 3)

  const getMultiImageStyling = index => {
    return {
      roundedBottomLeft: index === 0 ? 25 : 0,
      roundedTopLeft: index === 0 ? 25 : 0,
      roundedBottomRight: index === imagePreviewCount - 1 ? 25 : 0,
      roundedTopRight: index === imagePreviewCount - 1 ? 25 : 0,
    }
  }

  if (multiUpload) {
    return (
      <Box width={'100%'}>
        <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Images</ModalHeader>
            <ModalCloseButton />
            <ModalBody>"Hi!"</ModalBody>
          </ModalContent>
        </Modal>

        <Box width={'100%'} position={'relative'}>
          <Button
            onClick={onOpen}
            zIndex={5}
            position={'absolute'}
            right={'8px'}
            bottom={'8px'}
            rounded={100}
            backgroundColor={buttonBackgroundColor}
            color={theme.colors.background.light}
            _hover={{
              background: theme.colors.background.light,
              color: buttonBackgroundColor,
            }}
          >
            <FontAwesomeIcon icon={faImages} />
            <Box mr={1} />
            {`View ${srcList.length} photos`}
          </Button>
          <HStack justifyItems={'flex-start'} zIndex={1}>
            {srcList.slice(0, imagePreviewCount).map((value, index) => (
              <Image
                maxH={'250px'}
                fit={'cover'}
                width={`${100 / imagePreviewCount}%`}
                key={value}
                {...config}
                src={value}
                {...getMultiImageStyling(index)}
              />
            ))}
          </HStack>
        </Box>
      </Box>
    )
  }

  if (!!cardDisplay) {
    return (
      <AspectRatio>
        <Avatar
          name={name?.value || assocName?.value}
          {...config}
          cursor="pointer"
          onClick={viewDetail}
          src={src}
          w={'full'}
          borderRadius={'xl'}
        />
      </AspectRatio>
    )
  }

  if (!src)
    return (
      <Avatar
        onClick={viewDetail}
        cursor="pointer"
        {...config}
        bg={bg}
        color="white"
        icon={<FontAwesomeIcon icon={faUserAlt} />}
      />
    )
  return (
    <Avatar
      name={name?.value || assocName?.value}
      {...config}
      cursor="pointer"
      onClick={viewDetail}
      src={src}
    />
  )
}

const ImageType = {
  Read,
  Write,
}

export default ImageType
