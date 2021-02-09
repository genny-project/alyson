import { useState } from 'react'
import useApi from 'api'
import { Avatar, ButtonGroup, Button, IconButton, Tooltip } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro, faUpload } from '@fortawesome/free-solid-svg-icons'
import Snap from './Snap'

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
      <div hidden={!openSnap}>
        <Snap handleSave={handleSave} setOpenSnap={setOpenSnap} setLoading={setLoading} />
      </div>
      <div hidden={openSnap}>
        <ButtonGroup isAttached variant="outline">
          <Button onClick={openDropzone} leftIcon={<FontAwesomeIcon icon={faUpload} />}>
            Upload a Photo
          </Button>
          <IconButton
            onClick={() => setOpenSnap(true)}
            icon={<FontAwesomeIcon icon={faCameraRetro} />}
          />
        </ButtonGroup>
      </div>
    </div>
  )
}

const Read = ({ data }) => {
  const { getImageSrc } = useApi()
  const src = getImageSrc(data?.value)

  if (!src || !data?.value) return <Avatar />
  return <Avatar src={src} />
}

const ImageType = {
  Read,
  Write,
}

export default ImageType
