import { useState } from 'react'
import useApi from 'api'
import { Avatar, ButtonGroup, Button, Tooltip, Image, CloseButton, HStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons'
import Snap from './Snap'
import { onSendMessage } from 'vertx'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Write = ({ questionCode, data, openDropzone, onSendAnswer, handleSave, setLoading }) => {
  const { getImageSrc } = useApi()
  const src = getImageSrc(data?.value)

  const [openSnap, setOpenSnap] = useState(false)

  if (src)
    return (
      <HStack>
        <Avatar size="xl" src={src} />
        <Tooltip label="Click to remove">
          <CloseButton cursor="pointer" onClick={() => onSendAnswer()} />
        </Tooltip>
      </HStack>
    )

  return (
    <div>
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
            Upload photo
          </Button>
          <Button onClick={() => setOpenSnap(true)} leftIcon={<FontAwesomeIcon icon={faCamera} />}>
            Take photo
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

const Read = ({ data, parentCode, variant, config }) => {
  const { getImageSrc } = useApi()
  const src = getImageSrc(data?.value)

  const name = useSelector(selectCode(data?.baseEntityCode, 'PRI_NAME'))
  const assocName = useSelector(selectCode(data?.baseEntityCode, 'PRI_INTERN_NAME'))
  const viewDetail = () =>
    onSendMessage({ parentCode, targetCode: data?.baseEntityCode, code: 'ACT_PRI_EVENT_VIEW' })

  if (variant === 'profile_image') {
    return <Image {...config} src={src} alt="profile-picture" w="10rem" borderRadius="xl" />
  }

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
