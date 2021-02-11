import { useState, useEffect } from 'react'
import ImageType from './Image'
import { DropzoneDialog } from 'material-ui-dropzone'
import { CircularProgress, IconButton, Button, Tooltip, Link } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import useApi from 'api'

const Read = ({ data, dttData }) => {
  const typeName = dttData?.typeName
  const api = useApi()

  const [fileName, setFileName] = useState('')

  useEffect(() => {
    const getFileName = async uuid => {
      setFileName(await api.getMediaFileName(uuid))
    }
    if (data?.value) {
      getFileName(data?.value)
    }
  }, [api, data?.value])

  return typeName === 'Image' ? (
    <ImageType.Read data={data} />
  ) : (
    <Link href={api.getSrc(data?.value)}>{fileName || 'Download'}</Link>
  )
}

const Write = ({ data, dttData, onSendAnswer }) => {
  const api = useApi()
  const typeName = dttData?.typeName

  const [fileName, setFileName] = useState('')
  const [dropzone, setDropzone] = useState(false)
  const [loading, setLoading] = useState(false)
  const openDropzone = () => setDropzone(true)
  const closeDropzone = () => setDropzone(false)

  useEffect(() => {
    const getFileName = async uuid => {
      setFileName(await api.getMediaFileName(uuid))
    }
    if (data?.value) {
      getFileName(data?.value)
    }
  }, [api, data?.value])

  const handleSave = async files => {
    if (!files && files.length) return

    setLoading(true)
    let data = new FormData()
    data.append('file', files[0])

    try {
      const resp = await api.postMediaFile({ data })
      onSendAnswer(resp?.uuid)
    } catch (err) {
      console.error(err)
    }

    closeDropzone()
    setLoading(false)
  }

  return (
    <div>
      <div hidden={loading}>
        {typeName === 'Image' ? (
          <ImageType.Write
            handleSave={handleSave}
            openDropzone={openDropzone}
            data={data}
            onSendAnswer={onSendAnswer}
            setLoading={setLoading}
          />
        ) : data?.value ? (
          <Tooltip label="Click to remove">
            <Button onClick={() => onSendAnswer()}>{`${fileName || 'File'} Uploaded`}</Button>
          </Tooltip>
        ) : (
          <IconButton onClick={openDropzone} icon={<FontAwesomeIcon icon={faUpload} />} />
        )}
        <DropzoneDialog
          open={dropzone}
          onClose={closeDropzone}
          onSave={handleSave}
          showPreviews
          maxFileSize={50000000}
          filesLimit={1}
        />
      </div>
      <div hidden={!loading}>
        <CircularProgress isIndeterminate />
      </div>
    </div>
  )
}

const Upload = {
  Read,
  Write,
}

export default Upload
