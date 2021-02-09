import { useState } from 'react'
import ImageType from './Image'
import { DropzoneDialog } from 'material-ui-dropzone'
import { CircularProgress } from '@chakra-ui/react'
import useApi from 'api'

const Read = ({ data, dttData }) => {
  const typeName = dttData?.typeName

  return typeName === 'Image' ? <ImageType.Read data={data} /> : <div>Upload</div>
}

const Write = ({ data, dttData, onSendAnswer }) => {
  const api = useApi()
  const typeName = dttData?.typeName

  const [dropzone, setDropzone] = useState(false)
  const [loading, setLoading] = useState(false)
  const openDropzone = () => setDropzone(true)
  const closeDropzone = () => setDropzone(false)

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
        ) : (
          <div>Upload</div>
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
