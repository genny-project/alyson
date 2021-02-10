import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

import Text from 'app/DTT/text'
import Email from 'app/DTT/email'
import Upload from 'app/DTT/upload'
import Social from 'app/DTT/social'
import Status from 'app/DTT/status'
import Phone from 'app/DTT/phone'
import Date from 'app/DTT/date'

const Attribute = ({ code, attribute }) => {
  const data = useSelector(selectCode(code, attribute))
  const dtt = useSelector(selectCode(data?.attributeCode))
  const dttData = useSelector(selectCode(dtt))
  const component = dttData?.component

  if (!component) return <div />

  return component === 'email' ? (
    <Email.Read data={data} />
  ) : component === 'phone' ? (
    <Phone.Read data={data} />
  ) : component === 'text' ? (
    <Text.Read data={data} />
  ) : component === 'upload' ? (
    <Upload.Read data={data} dttData={dttData} />
  ) : component === 'social' ? (
    <Social.Read data={data} dttData={dttData} />
  ) : component === 'status' ? (
    <Status.Read data={data} />
  ) : component === 'date' ? (
    <Date.Read data={data} />
  ) : (
    <div>{data?.value}</div>
  )
}

export default Attribute
