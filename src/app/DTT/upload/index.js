import { useState, useEffect } from 'react'
import ImageType from './Image'
import { CircularProgress, Button, Tooltip, Link, HStack, CloseButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faFileDownload, faUpload } from '@fortawesome/free-solid-svg-icons'
import useApi from 'api'
import DropZone from './Dropzone'

const Read = ({ code, data, dttData, parentCode, variant, config }) => {
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

  if (typeName === 'Image')
    return (
      <ImageType.Read
        code={code}
        data={data}
        parentCode={parentCode}
        variant={variant}
        config={config}
      />
    )
  if (!data?.value) return null

  return (
    <Link style={{ textDecoration: 'none' }} href={api.getSrc(data.value)}>
      <Button colorScheme="primary" leftIcon={<FontAwesomeIcon size="lg" icon={faFileDownload} />}>
        {fileName || data.attributeName}
      </Button>
    </Link>
  )
}

const Write = ({ questionCode, data, dttData, onSendAnswer, video }) => {
  const api = useApi()
  const typeName = dttData?.typeName

  const [fileName, setFileName] = useState('')
  const [dropzone, setDropzone] = useState(!!video)
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

    closeDropzone()
    let data = new FormData()
    data.append('file', files[0])

    try {
      const resp = await api.postMediaFile({ data })
      onSendAnswer(resp?.uuid)
    } catch (err) {
      console.error(err)
    }

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
            questionCode={questionCode}
          />
        ) : data?.value ? (
          <HStack>
            <Button leftIcon={<FontAwesomeIcon icon={faCheck} />} colorScheme="green">{`${
              fileName || 'File'
            } Uploaded`}</Button>
            <Tooltip label="Click to remove">
              <CloseButton cursor="pointer" test-id={questionCode} onClick={() => onSendAnswer()} />
            </Tooltip>
          </HStack>
        ) : (
          <Button
            hidden={!!dropzone}
            test-id={questionCode}
            onClick={openDropzone}
            leftIcon={<FontAwesomeIcon icon={faUpload} />}
          >
            Upload file
          </Button>
        )}
        {dropzone && (
          <DropZone video={video} handleSave={handleSave} closeDropzone={closeDropzone} />
        )}
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
