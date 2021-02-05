import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

import Text from 'app/DTT/text'
import Upload from 'app/DTT/upload'

const Attribute = ({ code, attribute }) => {
  const data = useSelector(selectCode(code, attribute))
  const dtt = useSelector(selectCode(data?.attributeCode))
  const dttData = useSelector(selectCode(dtt))
  const component = dttData?.component

  if (!component) return <div />

  return component === 'text' ? (
    <Text.Read data={data} />
  ) : component === 'upload' ? (
    <Upload.Read data={data} dttData={dttData} />
  ) : (
    <div>{data?.value}</div>
  )
}

export default Attribute
