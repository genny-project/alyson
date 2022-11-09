import {
  Avatar,
  Button,
  ButtonGroup,
  CloseButton,
  HStack,
  Image,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { faCamera, faUpload, faUserAlt } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Snap from './Snap'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { isEmpty, map } from 'ramda'

const Write = ({
  questionCode,
  data,
  openDropzone,
  onSendAnswer,
  handleSave,
  setLoading,
  name,
}) => {
  const { getImageSrcList } = useApi()
  const src = getImageSrcList(data?.value)
  const displayImages = !!src && Array.isArray(src) && !isEmpty(src)

  const [openSnap, setOpenSnap] = useState(false)
  const onRemoveImage = () => {
    onSendAnswer('')
  }

  if (displayImages)
    return (
      <HStack>
        <HStack>
          {map(individualImageSrc => <Avatar size="xl" src={individualImageSrc} />)(src)}
        </HStack>

        <Tooltip label="Click to remove">
          <CloseButton cursor="pointer" onClick={onRemoveImage} />
        </Tooltip>
      </HStack>
    )

  return (
    <div id={questionCode}>
      {openSnap && (
        <Snap handleSave={handleSave} setOpenSnap={setOpenSnap} setLoading={setLoading} />
      )}
      <div hidden={openSnap}>
        <ButtonGroup>
          <Button
            test-id={questionCode}
            onClick={openDropzone}
            leftIcon={<FontAwesomeIcon icon={faUpload} />}
          >
            {name}
          </Button>
          <Button onClick={() => setOpenSnap(true)} leftIcon={<FontAwesomeIcon icon={faCamera} />}>
            Take Photo
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

const Read = ({ code, data, parentCode, variant, config }) => {
  const { getImageSrc } = useApi()
  const src = getImageSrc(data?.value, { height: '500', width: '500' })
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

  if (!!cardDisplay) {
    return (
      <Avatar
        name={name?.value || assocName?.value}
        {...config}
        cursor="pointer"
        onClick={viewDetail}
        src={src}
        height="35vh"
        width="35vw"
        borderRadius="none"
      />
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
