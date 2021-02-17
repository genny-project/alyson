import { useState, useEffect } from 'react'
import ImageType from './Image'
import { DropzoneDialog } from 'material-ui-dropzone'
import { CircularProgress, IconButton, Button, Tooltip, Link } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload, faUpload } from '@fortawesome/free-solid-svg-icons'
import useApi from 'api'

const Read = ({ data, dttData, parentCode, variant }) => {
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

  if (!data?.value) return null

  return typeName === 'Image' ? (
    <ImageType.Read data={data} parentCode={parentCode} variant={variant} />
  ) : (
    <Tooltip label={fileName}>
      <Link p="2" color="teal" href={api.getSrc(data?.value)}>
        <FontAwesomeIcon size="lg" icon={faFileDownload} />
      </Link>
    </Tooltip>
  )
}

const Write = ({ questionCode, data, dttData, onSendAnswer }) => {
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
            test-id={questionCode}
          />
        ) : data?.value ? (
          <Tooltip label="Click to remove">
            <Button test-id={questionCode} onClick={() => onSendAnswer()}>{`${
              fileName || 'File'
            } Uploaded`}</Button>
          </Tooltip>
        ) : (
          <IconButton
            test-id={questionCode}
            onClick={openDropzone}
            icon={<FontAwesomeIcon icon={faUpload} />}
          />
        )}
        <DropzoneDialog
          test-id={questionCode}
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
