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
} from '@chakra-ui/react'
import { compose, isEmpty, map, not } from 'ramda'
import { faUpload, faUserAlt, faCamera } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Snap from './Snap'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import safelyParseJson from 'utils/helpers/safely-parse-json'

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

  const src = getImageSrc(data?.value, { height: '500', width: '500' })
  const srcList =
    getImageSrcList(safelyParseJson(data?.value), { height: '300', width: '500' }, 'cover') || []

  console.log(srcList)
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

  const bg = useColorModeValue('gray.300', 'gray.600')
  if (variant === 'profile_image') {
    return <Image {...config} src={src} alt="profile-picture" w="10rem" borderRadius="xl" />
  }

  const getMultiImageStyling = index => {
    return {
      roundedBottomLeft: index === 0 ? 25 : 0,
      roundedTopLeft: index === 0 ? 25 : 0,
      roundedBottomRight: index === 2 ? 25 : 0,
      roundedTopRight: index === 2 ? 25 : 0,
    }
  }

  if (multiUpload) {
    return (
      <Box width={'100%'} position={'relative'}>
        <Button zIndex={5} position={'absolute'} right={'8px'} bottom={'8px'}>
          {`View ${srcList.length} photos`}
        </Button>
        <HStack justifyItems={'flex-start'} zIndex={1}>
          {srcList.slice(0, 3).map((value, index) => (
            <Image
              width="33%"
              key={value}
              {...config}
              src={value}
              {...getMultiImageStyling(index)}
            />
          ))}
        </HStack>
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
