import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

import Text from 'app/DTT/text'
import Email from 'app/DTT/email'
import Upload from 'app/DTT/upload'
import Social from 'app/DTT/social'
import Status from 'app/DTT/status'
import Phone from 'app/DTT/phone'
import Date from 'app/DTT/date'
import ProgressBar from 'app/DTT/progress_bar'

const Attribute = ({ code, attribute, size }) => {
  const data = useSelector(selectCode(code, attribute))
  const dtt = useSelector(selectCode(data?.attributeCode))
  const dttData = useSelector(selectCode(dtt))
  const component = dttData?.component

  if (!component) return <div />

  return component === 'email' ? (
    <Email.Read data={data} size={size} />
  ) : component === 'phone' ? (
    <Phone.Read data={data} size={size} />
  ) : component === 'text' ? (
    <Text.Read data={data} size={size} />
  ) : component === 'upload' ? (
    <Upload.Read data={data} dttData={dttData} size={size} />
  ) : component === 'social' ? (
    <Social.Read data={data} dttData={dttData} size={size} />
  ) : component === 'status' ? (
    <Status.Read data={data} size={size} />
  ) : component === 'date' ? (
    <Date.Read data={data} size={size} />
  ) : component === 'progress' ? (
    <ProgressBar.Read data={data} />
  ) : (
    <div>{data?.value}</div>
  )
}

export default Attribute
