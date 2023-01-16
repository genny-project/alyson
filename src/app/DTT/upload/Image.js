import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { compose, isEmpty, map, min, not } from 'ramda'
import { faCamera, faUpload, faUserAlt } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MultiImageViewer from './multi-image-viewer'
import Snap from './Snap'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTheme } from '@emotion/react'

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
        <Grid templateColumns={'1fr auto'} gap={'1rem'} mb="2">
          <Grid templateColumns={'repeat(auto-fill, minmax(min(100%, 5.5rem), 1fr))'} gap="1rem">
            {map(individualImageSrc => (
              <AspectRatio ratio={1}>
                <Avatar w={'100%'} src={individualImageSrc} />
              </AspectRatio>
            ))(src)}
          </Grid>
          <Tooltip label="Click to remove your selections.">
            <CloseButton cursor="pointer" onClick={onRemoveImage} />
          </Tooltip>
        </Grid>
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
  const isMobile = useIsMobile()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const src = getImageSrc(data?.value, { height: '500', width: '500' })
  const srcList =
    getImageSrcList(safelyParseJson(data?.value), { height: '500', width: '600' }, 'cover') || []
  const { cardDisplay, showSingleImgOnly } = config || ''

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

  const imagePreviewCount = isMobile ? 1 : min(srcList.length, 3)

  if (!!showSingleImgOnly) {
    const imgSrc = srcList[0]

    return (
      <AspectRatio
        w={'min(100%, 20rem)'}
        h={'auto'}
        borderRadius={0}
        borderTopLeftRadius={'xl'}
        borderTopRightRadius={'xl'}
        overflow={'hidden'}
      >
        <Image fit={'cover'} {...config} src={imgSrc} overflow="hidden" />
      </AspectRatio>
    )
  }

  if (multiUpload) {
    return (
      <Box w={'full'}>
        <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Images</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <MultiImageViewer uuidList={safelyParseJson(data?.value)} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Box width={'full'} position={'relative'}>
          <Button
            onClick={onOpen}
            zIndex={5}
            position={'absolute'}
            right={'8px'}
            bottom={'8px'}
            rounded={100}
            backgroundColor={theme.colors.background.light}
            color={buttonBackgroundColor}
            _hover={{
              background: buttonBackgroundColor,
              color: theme.colors.background.light,
            }}
          >
            {`View ${srcList.length} photos`}
            <Box mr={2} />
            <FontAwesomeIcon icon={faImages} />
          </Button>

          <Grid
            justifyItems={'flex-start'}
            zIndex={1}
            templateColumns={`repeat(${imagePreviewCount}, 1fr)`}
            gap={3}
          >
            {srcList.slice(0, imagePreviewCount).map((value, index) => (
              <AspectRatio
                key={value}
                w={'full'}
                maxHeight={350}
                overflow={'hidden'}
                _first={{ borderTopLeftRadius: '2rem', borderBottomLeftRadius: '2rem' }}
                _last={{ borderTopRightRadius: '2rem', borderBottomRightRadius: '2rem' }}
              >
                <Image fit={'cover'} {...config} src={value} overflow="hidden" />
              </AspectRatio>
            ))}
          </Grid>
        </Box>
      </Box>
    )
  }

  if (!!cardDisplay) {
    return (
      <AspectRatio>
        <Avatar
          name={name?.value || assocName?.value}
          cursor="pointer"
          onClick={viewDetail}
          src={src}
          w={'full'}
          borderRadius={'xl'}
          {...config}
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
