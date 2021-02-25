import { useState } from 'react'
import useApi from 'api'
import { Avatar, ButtonGroup, Button, Tooltip, Image } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons'
import Snap from './Snap'
import { onSendMessage } from 'vertx'

const Write = ({ data, openDropzone, onSendAnswer, handleSave, setLoading }) => {
  const { getImageSrc } = useApi()
  const src = getImageSrc(data?.value)

  const [openSnap, setOpenSnap] = useState(false)

  if (src)
    return (
      <Tooltip label="Click to remove">
        <Avatar cursor="pointer" onClick={() => onSendAnswer()} size="xl" src={src} />
      </Tooltip>
    )

  return (
    <div>
      {openSnap && (
        <Snap handleSave={handleSave} setOpenSnap={setOpenSnap} setLoading={setLoading} />
      )}
      <div hidden={openSnap}>
        <ButtonGroup>
          <Button onClick={openDropzone} leftIcon={<FontAwesomeIcon icon={faUpload} />}>
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

const Read = ({ data, parentCode, variant }) => {
  const { getImageSrc } = useApi()
  const src = getImageSrc(data?.value)

  if (!src || !data?.value) return <Avatar />

  const viewDetail = () =>
    onSendMessage({ parentCode, targetCode: data.baseEntityCode, code: 'ACT_PRI_EVENT_VIEW' })

  if (variant === 'profile_image') {
    return <Image src={src} alt="profile-picture" w="10rem" borderRadius="xl" />
  }

  return <Avatar cursor="pointer" onClick={viewDetail} src={src} />
}

const ImageType = {
  Read,
  Write,
}

export default ImageType
