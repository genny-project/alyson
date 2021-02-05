import ImageType from './Image'

const Read = ({ data, dttData }) => {
  const typeName = dttData?.typeName

  return typeName === 'Image' ? <ImageType.Read data={data} /> : <div>Upload</div>
}

const Upload = {
  Read,
}

export default Upload
